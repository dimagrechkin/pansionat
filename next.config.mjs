/** @type {import('next').NextConfig} */
const nextConfig = {
    // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
 
    
    // eslint: {
    //     // Warning: This allows production builds to successfully complete even if
    //     // your project has ESLint errors.
    //     ignoreDuringBuilds: true,
    //   },
    //   typescript: {
    //     // !! WARN !!
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    //   },
    // //   images: { unoptimized: true },
    //   output: 'export',
};

export default nextConfig;
