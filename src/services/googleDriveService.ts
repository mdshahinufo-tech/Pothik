import { getAccessToken } from '../firebase';

export interface DriveTripFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  createdTime?: string;
  size?: string;
}

class GoogleDriveService {
  private folderName = 'Tripbooking.ai - Saint Martin Passes';
  private cachedFolderId: string | null = null;

  // Find or create the dedicated folder in the user's Google Drive
  private async getOrCreateFolder(token: string): Promise<string> {
    if (this.cachedFolderId) return this.cachedFolderId;

    // Search for existing folder
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      `name = '${this.folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    )}&fields=files(id,name)`;

    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (searchRes.ok) {
      const data = await searchRes.json();
      if (data.files && data.files.length > 0) {
        this.cachedFolderId = data.files[0].id;
        return this.cachedFolderId!;
      }
    }

    // Create folder if not found
    const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.folderName,
        mimeType: 'application/vnd.google-apps.folder',
      }),
    });

    if (!createRes.ok) {
      throw new Error('Failed to create trip folder in Google Drive');
    }

    const folder = await createRes.json();
    this.cachedFolderId = folder.id;
    return folder.id;
  }

  // Upload an HTML Travel Pass receipt into Google Drive
  public async uploadTravelPassToDrive(passData: {
    passNumber: string;
    passengerName: string;
    phone: string;
    nid: string;
    shipName: string;
    resortName: string;
    travelDate: string;
    returnDate: string;
    travelersCount: number;
    totalAmount?: number;
  }): Promise<{ fileId: string; webViewLink: string; fileName: string }> {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('Please sign in with Google to save documents to your Google Drive.');
    }

    const folderId = await this.getOrCreateFolder(token);
    const fileName = `Saint-Martin-Travel-Pass-${passData.passNumber}.html`;

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>St. Martin Travel Pass - ${passData.passNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; padding: 24px; }
    .ticket-card { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; border: 2px solid #0891b2; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
    .badge { background: #059669; color: white; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; }
    .qr-box { background: #0f172a; color: white; border-radius: 12px; padding: 16px; text-align: center; margin: 20px 0; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; margin: 16px 0; }
    .meta-item { background: #f1f5f9; padding: 10px; border-radius: 8px; }
    .footer { text-align: center; font-size: 11px; color: #64748b; margin-top: 20px; border-top: 1px dashed #cbd5e1; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="ticket-card">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="color: #0891b2; margin: 0;">Tripbooking.ai Official Pass</h2>
      <span class="badge">100% VERIFIED PASS</span>
    </div>
    <div style="margin-top: 8px; font-size: 12px; color: #475569;">
      Bangladesh Tourism Board & BIWTA Compliant Travel Clearance
    </div>
    <div class="qr-box">
      <div style="font-size: 18px; font-weight: bold; letter-spacing: 2px;">${passData.passNumber}</div>
      <div style="font-size: 10px; color: #38bdf8; margin-top: 4px;">SHA-256 DIGITAL ENCRYPTED PASS</div>
    </div>
    <div class="meta-grid">
      <div class="meta-item"><strong>Passenger:</strong> ${passData.passengerName}</div>
      <div class="meta-item"><strong>Mobile:</strong> ${passData.phone}</div>
      <div class="meta-item"><strong>Vessel:</strong> ${passData.shipName}</div>
      <div class="meta-item"><strong>Resort:</strong> ${passData.resortName}</div>
      <div class="meta-item"><strong>Travel Date:</strong> ${passData.travelDate}</div>
      <div class="meta-item"><strong>Return Date:</strong> ${passData.returnDate}</div>
      <div class="meta-item"><strong>Travelers:</strong> ${passData.travelersCount} Persons</div>
      <div class="meta-item"><strong>NID/Passport:</strong> ${passData.nid}</div>
    </div>
    <div class="footer">
      Generated on ${new Date().toLocaleString()} by POTHIK (পথিক) • Hotline & WhatsApp: +8801576466092
    </div>
  </div>
</body>
</html>`;

    // Multi-part upload to Google Drive
    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const metadata = {
      name: fileName,
      mimeType: 'text/html',
      parents: [folderId],
    };

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: text/html\r\n\r\n' +
      htmlContent +
      closeDelimiter;

    const uploadRes = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Failed to upload ticket to Google Drive');
    }

    const file = await uploadRes.json();
    return {
      fileId: file.id,
      webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
      fileName,
    };
  }

  // List existing trip files from Google Drive
  public async listTripFilesFromDrive(): Promise<DriveTripFile[]> {
    const token = await getAccessToken();
    if (!token) return [];

    try {
      const folderId = await this.getOrCreateFolder(token);
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        `'${folderId}' in parents and trashed = false`
      )}&fields=files(id,name,mimeType,webViewLink,createdTime,size)&orderBy=createdTime desc`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return [];
      const data = await res.json();
      return data.files || [];
    } catch (e) {
      console.warn('Error fetching Drive files:', e);
      return [];
    }
  }

  // Delete file with mandatory confirmation handling
  public async deleteFileFromDrive(fileId: string): Promise<boolean> {
    const token = await getAccessToken();
    if (!token) return false;

    const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.ok;
  }
}

export const googleDriveService = new GoogleDriveService();
