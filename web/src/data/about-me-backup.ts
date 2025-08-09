export const ABOUT_ME_DATA = [
  {
    id: 'intro',
    type: 'p',
    children: [
      "👋 Hi there! I'm ",
      { type: 'strong', children: ['Utkarsh Mishra'] },
      ', a computer nerd and a Senior Full Stack Developer 🌐. I started programming in 2005 on a ',
      {
        type: 'Link',
        props: {
          href: 'https://www.reddit.com/r/retrobattlestations/comments/r41pp9/portable_week_vtech_pre_computer_power_pad_from/',
          target: '_blank',
        },
        children: ['🤖 V Tech Pre Computer Power Pad'],
      },
      '. Clearly, I could not be be found AFK since then 😉.',
    ],
  },
  {
    id: 'tagline',
    type: 'p',
    children: [
      'I love building for the heck of it and I strive to inculcate the best programming practices as I go 🚀',
      'I have both failed and succeeded in shipping products and features for Analytics, eCommerce, Employee Engagement & Brand Management SaaS, etc 🤖 I hope to be a part of more meaningful and impactful codebases as I go ☘️.',
    ],
  },
]
