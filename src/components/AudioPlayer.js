import React, { Component } from 'react';

export class AudioAudible extends Component { // volume icon audible
  render() {
    return (
        <div className="icon audible">
            <svg width="65px" height="51px" viewBox="0 0 65 51">
                <defs>
                    <path d="M34.9190574,11.7216707 L34.8470499,11.7939834 C34.2703792,12.3724847 34.155045,13.2664769 34.5681731,13.9709915 C35.8685808,16.1891903 36.613981,18.7713935 36.613981,21.5272081 C36.613981,24.1994207 35.9137381,26.7096163 34.6835073,28.8814374 C34.2853299,29.5841213 34.4043254,30.4649934 34.9745887,31.0370874 L35.0462911,31.1094 C35.8829213,31.9487762 37.30385,31.7748597 37.8823514,30.7402087 C39.4067148,28.0136854 40.2753822,24.8722032 40.2753822,21.5272081 C40.2753822,18.0845757 39.35515,14.8546096 37.7456591,12.0728601 C37.1561735,11.0543803 35.7498904,10.8880917 34.9190574,11.7216707" id="vibe1-path"></path>
                    <filter x="-126.0%" y="-26.9%" width="351.9%" height="173.3%" filterUnits="objectBoundingBox" id="vibe1-filter">
                        <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                        <feColorMatrix values="0 0 0 0 0.667517007   0 0 0 0 0.364100186   0 0 0 0 0  0 0 0 0.645323822 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <path d="M40.4458509,6.17147472 L40.3149558,6.30298004 C39.6763465,6.94464059 39.615018,7.95884871 40.1684998,8.67495776 C42.9160762,12.2307885 44.5469253,16.6870188 44.5469253,21.5273912 C44.5469253,26.2820257 42.9722177,30.6680791 40.3094637,34.1915675 C39.7678815,34.9085919 39.8337867,35.9130363 40.4681245,36.549815 L40.4681245,36.549815 C41.2361033,37.3205399 42.515763,37.2463966 43.1732897,36.3789496 C46.3342993,32.2086137 48.2083265,27.0100343 48.2083265,21.3748328 C48.2083265,15.7262061 46.3257561,10.515117 43.1501008,6.33959405 C42.4916588,5.47367268 41.2132196,5.40074977 40.4458509,6.17147472" id="vibe2-path"></path>
                    <filter x="-89.1%" y="-17.5%" width="278.2%" height="147.7%" filterUnits="objectBoundingBox" id="vibe2-filter">
                        <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                        <feColorMatrix values="0 0 0 0 0.667517007   0 0 0 0 0.364100186   0 0 0 0 0  0 0 0 0.645323822 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <path d="M45.9157096,0.683278479 L45.8089188,0.790374463 C45.1654275,1.43691688 45.1016581,2.46607572 45.6725316,3.17699778 C49.6359983,8.11348189 52.0070607,14.3863774 52.0070607,21.2069575 C52.0070607,28.0974094 49.5877899,34.4261413 45.5526207,39.3882552 C44.9744244,40.0991773 45.036058,41.1341333 45.6826004,41.7834218 L45.9385934,42.0406352 C46.6977239,42.803122 47.9517538,42.7341656 48.6254516,41.8947894 C53.1378234,36.2760642 55.8362761,29.1393831 55.8362761,21.3747718 C55.8362761,13.5970404 53.1286699,6.45029041 48.6016525,0.827293591 C47.9273445,-0.01055704 46.674535,-0.0789031949 45.9157096,0.683278479" id="vibe3-path"></path>
                    <filter x="-70.2%" y="-13.0%" width="240.4%" height="135.4%" filterUnits="objectBoundingBox" id="vibe3-filter">
                        <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                        <feColorMatrix values="0 0 0 0 0.667517007   0 0 0 0 0.364100186   0 0 0 0 0  0 0 0 0.645323822 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                    <path d="M14.7762251,11.1533297 L2.44096461,11.1533297 C1.09295876,11.1533297 3.05116763e-05,12.2462579 3.05116763e-05,13.5942638 L3.05116763e-05,28.2398684 C3.05116763e-05,29.5878743 1.09295876,30.6808025 2.44096461,30.6808025 L14.067744,30.6808025 L27.0525981,41.1170163 C27.4318582,41.4218279 27.9038738,41.5881166 28.3905351,41.5881166 C29.5701165,41.5881166 30.5263524,40.6318806 30.5263524,39.4522992 L30.5263524,2.68450882 C30.5263524,2.18838896 30.3536563,1.70783006 30.0375554,1.32490852 C29.286663,0.415355449 27.9404878,0.286596175 27.0309348,1.03748853 L14.7762251,11.1533297 Z" id="horn-path"></path>
                    <filter x="-24.6%" y="-13.4%" width="149.1%" height="136.6%" filterUnits="objectBoundingBox" id="horn-filter">
                        <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                        <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                        <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                        <feColorMatrix values="0 0 0 0 0.667517007   0 0 0 0 0.364100186   0 0 0 0 0  0 0 0 0.645323822 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                    </filter>
                </defs>
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(-1408.000000, -28.000000)">
                        <g id="unmute" transform="translate(1413.000000, 30.000000)">
                            <g id="vibe-1">
                                <use fill="black" fillOpacity="1" filter="url(#vibe1-filter)" xlinkHref="#vibe1-path"></use>
                                <use stroke="#9A6500" strokeWidth="1" fillOpacity="0.551658741" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#vibe1-path"></use>
                            </g>
                            <g id="vibe-2">
                                <use fill="black" fillOpacity="1" filter="url(#vibe2-filter)" xlinkHref="#vibe2-path"></use>
                                <use stroke="#9A6500" strokeWidth="1" fillOpacity="0.551658741" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#vibe2-path"></use>
                            </g>
                            <g id="vibe-3">
                                <use fill="black" fillOpacity="1" filter="url(#vibe3-filter)" xlinkHref="#vibe3-path"></use>
                                <use stroke="#9A6500" strokeWidth="1" fillOpacity="0.551658741" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#vibe3-path"></use>
                            </g>
                            <g id="horn">
                                <use fill="black" fillOpacity="1" filter="url(#horn-filter)" xlinkHref="#horn-path"></use>
                                <use stroke="#9A6500" strokeWidth="1" fillOpacity="0.551658741" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#horn-path"></use>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
  }
}

export class AudioMuted extends Component { // volume icon muted
  render() {
    return (
        <div className="icon muted">

<svg width="50px" height="50px" viewBox="0 0 50 50">
    <defs>
        <path d="M5.07001542,11.3636956 L33.5129474,39.8066276 C33.4884435,40.9705641 32.5389164,41.9017133 31.3719169,41.9017133 C30.8818384,41.9017133 30.4101378,41.7363118 30.027264,41.4300127 L16.9942384,30.9545844 L5.32118066,30.9545844 C3.96733875,30.9545844 2.87078807,29.8549707 2.87078807,28.5041918 L2.87078807,13.8018363 C2.87078807,13.1249153 3.14645724,12.5123172 3.5875279,12.0681835 C3.97652773,11.6822467 4.49417316,11.4218925 5.07001542,11.3636956" id="split2-path"></path>
        <filter x="-24.5%" y="-18.0%" width="149.0%" height="149.1%" filterUnits="objectBoundingBox" id="split2-filter">
            <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
            <feColorMatrix values="0 0 0 0 0.667517007   0 0 0 0 0.364100186   0 0 0 0 0  0 0 0 0.645323822 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <path d="M40.9560149,40.9552492 C40.0646846,41.8465795 38.618953,41.8465795 37.7245597,40.9552492 L33.5160104,36.7466999 L8.12075419,11.3514437 L0.821647265,4.05233675 C-0.0696830393,3.16100644 -0.0696830393,1.71527481 0.821647265,0.823944509 C1.26578092,0.376747861 1.85081215,0.153149537 2.43584338,0.153149537 C3.02087462,0.153149537 3.60590585,0.376747861 4.05310249,0.823944509 L14.5806017,11.3514437 L17.7048522,11.3514437 L30.005823,1.19456639 C30.9185943,0.441070666 32.2724362,0.569716277 33.0259319,1.48248752 C33.3414199,1.86842435 33.5160104,2.3493139 33.5160104,2.84858139 L33.5160104,30.2868524 L40.9560149,37.7268569 C41.8473452,38.6181872 41.8473452,40.0639189 40.9560149,40.9552492" id="split1-path"></path>
        <filter x="-18.1%" y="-13.3%" width="136.2%" height="136.2%" filterUnits="objectBoundingBox" id="split1-filter">
            <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
            <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
            <feColorMatrix values="0 0 0 0 0.667517007   0 0 0 0 0.364100186   0 0 0 0 0  0 0 0 0.645323822 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1406.000000, -27.000000)">
            <g id="mute" transform="translate(1410.000000, 29.000000)">
                <g id="split-2">
                    <use fill="black" fillOpacity="1" filter="url(#split2-filter)" xlinkHref="#split2-path"></use>
                    <use stroke="#9A6500" strokeWidth="1" fillOpacity="0.551658741" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#split2-path"></use>
                </g>
                <g id="split-1">
                    <use fill="black" fillOpacity="1" filter="url(#split1-filter)" xlinkHref="#split1-path"></use>
                    <use stroke="#9A6500" strokeWidth="1" fillOpacity="0.551658741" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#split1-path"></use>
                </g>
            </g>
        </g>
    </g>
</svg>
        </div>
    );
  }
}

export class NextControl extends Component { // forward button large
  render() {
    return (
        <div className="next control">
            <svg width="73px" height="81px" viewBox="0 0 73 81">
            <defs>
                <path d="M563,43.8333333 L517.969464,71.3519942 C514.67262,73.3667322 512,71.8620903 512,67.9968325 L512,5.00316749 C512,1.13542488 514.666792,-0.370293903 517.969464,1.64800582 L563,29.1666667 L563,9.00348663 C563,6.79242202 564.796521,5 566.995826,5 L571.004174,5 C573.211008,5 575,6.79537646 575,9.00348663 L575,64.9965134 C575,67.207578 573.203479,69 571.004174,69 L566.995826,69 C564.788992,69 563,67.2046235 563,64.9965134 L563,43.8333333 Z" id="next-track"></path>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-903.000000, -309.000000)">
                    <g transform="translate(396.000000, 311.000000)">
                        <g>
                            <use fill="black" fillOpacity="1" filter="url(#control-filter)" xlinkHref="#next-track"></use>
                            <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#next-track"></use>
                        </g>
                    </g>
                </g>
            </g>
            </svg>
        </div>
    );
  }
}

export class PauseControl extends Component { // pause button large
  render() {
    return (
        <div className="pause control">
            <svg width="122px" height="144px" viewBox="0 0 95 144">
            <defs>
                <path d="M641,214.491553 C641,210.354082 644.366293,207 648.5,207 L648.5,207 C652.642136,207 656,210.362584 656,214.491553 L656,333.508447 C656,337.645918 652.633707,341 648.5,341 L648.5,341 C644.357864,341 641,337.637416 641,333.508447 L641,214.491553 Z M711,214.491553 C711,210.354082 714.366293,207 718.5,207 L718.5,207 C722.642136,207 726,210.362584 726,214.491553 L726,333.508447 C726,337.645918 722.633707,341 718.5,341 L718.5,341 C714.357864,341 711,337.637416 711,333.508447 L711,214.491553 Z" id="pause-bars"></path>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-636.000000, -204.000000)">
                    <g>
                        <use fill="black" fillOpacity="1" filter="url(#control-filter)" xlinkHref="#pause-bars"></use>
                        <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#pause-bars"></use>
                    </g>
                </g>
            </g>
            </svg>
        </div>
    );
  }
}

export class PlayControl extends Component { // play button large
  render() {
    return (
        <div className="play control">
            <svg width="122px" height="144px" viewBox="0 0 122 144">
            <defs>
                <path d="M744.186338,266.205022 C751.263128,270.51007 751.262665,277.490212 744.186338,281.794978 L649.813662,339.205022 C642.736872,343.51007 637,340.27508 637,331.993513 L637,216.006487 C637,207.718633 642.737335,204.490212 649.813662,208.794978 L744.186338,266.205022 Z" id="play-triangle-large"></path>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-632.000000, -204.000000)">
                    <g>
                        <use fill="black" fillOpacity="1" filter="url(#control-filter)" xlinkHref="#play-triangle-large"></use>
                        <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#play-triangle-large"></use>
                    </g>
                </g>
            </g>
            </svg>
        </div>
    );
  }
}

export class PrevControl extends Component { // back button large
  render() {
    return (
        <div className="prev control">
            <svg width="73px" height="81px" viewBox="0 0 73 81">
            <defs>
                <path d="M51,43.8333333 L5.96946407,71.3519942 C2.6726201,73.3667322 0,71.8620903 0,67.9968325 L0,5.00316749 C0,1.13542488 2.66679179,-0.370293903 5.96946407,1.64800582 L51,29.1666667 L51,9.00348663 C51,6.79242202 52.7965212,5 54.9958262,5 L59.0041738,5 C61.2110077,5 63,6.79537646 63,9.00348663 L63,64.9965134 C63,67.207578 61.2034788,69 59.0041738,69 L54.9958262,69 C52.7889923,69 51,67.2046235 51,64.9965134 L51,43.8333333 Z" id="prev-track"></path>
                <filter x="-6.2%" y="-3.8%" width="112.5%" height="110.3%" filterUnits="objectBoundingBox" id="control-filter">
                    <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                    <feOffset dx="0" dy="2" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                </filter>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-391.000000, -309.000000)">
                    <g transform="translate(396.000000, 311.000000)">
                        <g transform="translate(31.500000, 36.498978) scale(-1, 1) translate(-31.500000, -36.498978) ">
                            <use fill="black" fillOpacity="1" filter="url(#control-filter)" xlinkHref="#prev-track"></use>
                            <use stroke="#752F00" strokeWidth="1" fillOpacity="0.1953125" fill="#FFFFFF" fillRule="evenodd" xlinkHref="#prev-track"></use>
                        </g>
                    </g>
                </g>
            </g>
            </svg>
        </div>
    );
  }
}

export class Tracker extends Component { // back button large
  render() {
    return (
        <div className={ `tracker ${this.props.readOnly ? 'read-only' : ''}` }>
            <input className="progresscircle" />
        </div>
    );
  }
}

export class VolumeScrubber extends Component { // volume scrubber
  render() {
    return (
        <div className="scrubber"><div><div></div></div></div>
    );
  }
}
