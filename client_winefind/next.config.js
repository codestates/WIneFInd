module.exports = {
  reactStrictMode: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/index': { page: '/' },
      '/kakao': { page: '/kakao' },
      '/mall': { page: '/mall' },
      '/myprofile': { page: '/myprofile' },
      '/resign': { page: '/resign' },
      '/shoppinglist': { page: '/shoppinglist' },
      '/test': { page: '/test' },
      '/upload': { page: '/upload' },
      '/user': { page: '/user' },

      // '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    };
  },
};
