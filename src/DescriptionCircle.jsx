import React from 'react'

export default function DescriptionCircle({ text }) {
  return (
    <div>  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="779"
    height="237"
    fill="none"
    viewBox="0 0 779 237"
  >
    <g filter="url(#filter0_d_290_91)">
      <path
        fill="#fff"
        d="M738.999 131.488c.515 81.552-146.113 67.184-359.766 59.086-158.088 0-317.145 30.254-336.765-59.086C15.555 8.946 214.085 46.865 379.233 49.381c163.325 2.488 358.909-53.5 359.766 82.107z"
      ></path>
    </g>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#000">
        {text}
      </text>
    <defs>
      <filter
        id="filter0_d_290_91"
        width="779"
        height="237"
        x="0"
        y="0"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset></feOffset>
        <feGaussianBlur stdDeviation="20"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_290_91"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_290_91"
          result="shape"
        ></feBlend>
        
      </filter>
    </defs>
  </svg>

  </div>
  )
}
