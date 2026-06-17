export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter','sans-serif'], mono: ['JetBrains Mono','monospace'] },
      colors: {
        acc: { DEFAULT:'#5b3df5', light:'#ede9ff', mid:'#7c5ff7', dark:'#3d22d4' },
      },
    },
  },
  plugins: [],
};
