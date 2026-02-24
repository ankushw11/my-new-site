import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Read the HTML file from public folder
    const filePath = join(process.cwd(), 'public', 'profile', 'company-profile.html');
    const htmlContent = readFileSync(filePath, 'utf-8');
    
    // Return HTML with proper content type
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving profile page:', error);
    return new NextResponse('Profile page not found', { status: 404 });
  }
}
