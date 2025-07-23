import Image from "next/image"

export default {
  logo: <>
    <Image
      src="/logo.svg"
      width="32"
      height="32"
    />
    <span style={{ marginLeft: '.4em', fontWeight: 700 }}>ZeroDegree</span></>,
  project: {
    link: 'https://github.com/ekretos/zed-docs'
  },
  logoLink: '/',
  // Remove docsRepositoryBase to prevent Git integration
  // docsRepositoryBase: 'https://github.com/ekretos/zed-docs/blob/main/',
  head: (
    <>
      <link rel="icon" href="favicon.ico" type="image/x-icon"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="ZeroDegree - Ultimate Anti-Nuke Bot" />
      <meta property="og:description" content="The ultimate anti-nuke bot, designed to keep your server safe and secure while offering top-tier performance." />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s | ZeroDegree Docs'
    }
  },

  // Completely disable Git timestamp to avoid native binding issues
  gitTimestamp: false,

  // banner: {
  //   key: 'Note',
  //   text: "🚧 We're still working on this documentation.",
  // },
  chat: {
    link: 'https://discord.gg/gWXwr7Vnc7',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z%2F%3E%3C%2Fsvg%3E"
        />
      </svg>
    )
  },
  footer: {
    text: (
      <span>
        Copyright {new Date().getFullYear()} ©{' '}
        <a href="https://zedbot.xyz" target="_blank">
          Zed Bot
        </a>
      </span>
    )
  },
  // primaryHue: {
  //   dark: 232,
  //   light: 259
  // },
  // primarySaturation: {
  //   dark: 45,
  //   light: 70
  // },
  toc: {
    backToTop: true
  },
  sidebar: {
    toggleButton: true
  },
  sidebar: {
    autoCollapse: true
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  },

  // i18n: [
  //   { locale: 'en-US', text: 'English' },
  // ]
}
