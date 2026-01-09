import React from 'react'
import logo from '../assets/icons/logo1.png';
import logo2 from '../assets/icons/logo2.png';
import logo3 from '../assets/icons/logo3.png';

const Header = () => {
  return (
    <div className="relative z-20">
      {/* Logo Section - Responsive */}
      <div className="absolute top-4 left-4 md:top-6.25 md:left-9.75 lg:top-10 lg:left-30.25">
        <div className="relative w-15 h-7.75 md:w-15 md:h-[31.37px] lg:w-[89.89px] lg:h-11.75">
          {/* Logo 1 */}
          <img
            src={logo}
            alt="Logo 1"
            className="absolute top-0.5 left-0 w-6.75 h-6 md:top-[2.02px] md:w-[27.38px] md:h-[24.44px] lg:top-0.75 lg:w-10.25 lg:h-[36.62px] object-contain"
          />

          {/* Logo 2 */}
          <img
            src={logo2}
            alt="Logo 2"
            className="absolute top-0.5 left-6 w-5 h-6 md:top-[2.02px] md:left-[23.91px] md:w-[20.31px] md:h-[24.40px] lg:top-0.75 lg:left-[35.82px] lg:w-[30.42px] lg:h-[36.55px] object-contain"
          />

          {/* Logo 3 with color */}
          <div
            className="absolute top-0 left-9 w-3.75 h-6.75 md:top-0 md:left-[36.61px] md:w-[15.56px] md:h-[27.94px] lg:left-[54.84px] lg:w-[23.32px] lg:h-[41.86px] rotate-12 origin-bottom-left bg-[#F5BD52]"
            style={{
              WebkitMaskImage: `url(${logo3})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${logo3})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Header;