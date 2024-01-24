const { withAxiom } = require('next-axiom')

const moduleExports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tknjbaclwamgdwtkgaez.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = withAxiom(moduleExports)
