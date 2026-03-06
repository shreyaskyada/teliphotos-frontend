import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 100)
      : 'Free Photo Storage Cloud';
    const description = searchParams.has('description')
      ? searchParams.get('description')?.slice(0, 120)
      : 'Transform your Telegram account into a free photo storage cloud gallery.';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#030712', // dark background (tailwind gray-950)
            backgroundImage: 'radial-gradient(circle at 50% 120%, rgba(139, 92, 246, 0.4), rgba(3, 7, 18, 1))', // violet gradient
            color: 'white',
            fontFamily: 'sans-serif',
            padding: '80px',
            textAlign: 'center',
          }}
        >
          {/* Logo or brand name */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            {/* simple cloud/icon representation */}
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
            <span style={{ fontSize: '48px', fontWeight: 800, marginLeft: '20px', letterSpacing: '-0.05em' }}>Telephotos</span>
          </div>
          
          <div
            style={{
              fontSize: '72px',
              fontStyle: 'normal',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.05em',
              marginBottom: '30px',
              background: 'linear-gradient(to right, #f8fafc, #c084fc)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              fontSize: '32px',
              fontWeight: 400,
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
