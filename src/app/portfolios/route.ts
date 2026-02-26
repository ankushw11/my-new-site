import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Read the HTML file from public/portfolio folder
    const filePath = join(process.cwd(), 'public', 'portfolio', 'index.html');
    const htmlContent = readFileSync(filePath, 'utf-8');
    
    // Return HTML with proper content type
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving portfolios page:', error);
    return new NextResponse('Portfolios page not found', { status: 404 });
  }
}
