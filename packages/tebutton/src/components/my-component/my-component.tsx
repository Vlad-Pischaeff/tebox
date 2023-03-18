// import { Component, Prop, State, h } from '@stencil/core';
// // import { format } from '../../utils/utils';

// @Component({
//         tag: 'my-component',
//         styleUrl: 'my-component.css',
//         shadow: true,
//     })
//     export class MyComponent {
//     /**
//      * The first name
//      */
//     @Prop() first: string;

//     /**
//      * The middle name
//      */
//     @Prop() middle: string;

//     /**
//      * The last name
//      */
//     @Prop() last: string;

//     @State() show: boolean = false;

//     private onClickHandler() {
//         this.show = !this.show;
//         console.log('click...', this.show)
//     }

//     render() {
//         return (
//             <div class="tbx">
//                 <div class={this.show ? "tbx_panel" : "tbx_panel none" } id="tbx_panel">
//                     <iframe src="http://localhost:5000/client" frameborder="0" scrolling="no"> </iframe>
//                     <div class="tbx_panel-close" id="tbx_close"></div>
//                 </div>
//                 <div class="tbx_icon" id="tbx_icon" onClick={this.onClickHandler}>
//                     <div class="tbx_icon-ring"></div>
//                     <div class="tbx_icon-button">
//                         <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0,0,64,64">
//                             <g fill="orange" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none">
//                                 <path d="M32,10c-13.785,0 -25,8.95013 -25,19.95313c0,6.873 4.34638,13.15183 11.48438,16.79883c-2.037,3.434 -3.98091,6.19942 -4.00391,6.23242c-0.453,0.644 -0.48598,1.49388 -0.08399,2.17188c0.364,0.611 1.0207,0.98047 1.7207,0.98047c0.076,0 0.15252,-0.00467 0.22852,-0.01367c0.261,-0.03 6.30288,-0.77725 13.67188,-6.28125c0.672,0.043 1.33642,0.06445 1.98242,0.06445c13.785,0 25,-8.95012 25,-19.95312c0,-11.003 -11.215,-19.95312 -25,-19.95312zM32,14c11.579,0 21,7.15612 21,15.95313c0,8.797 -9.421,15.95313 -21,15.95313c-0.778,0 -1.59102,-0.03442 -2.41602,-0.10742c-0.5,-0.046 -1.00239,0.10211 -1.40039,0.41211c-2.748,2.131 -5.30228,3.51239 -7.36328,4.40039c0.715,-1.152 1.48733,-2.44411 2.23633,-3.78711c0.28,-0.499 0.33158,-1.09477 0.14258,-1.63477c-0.189,-0.54 -0.59991,-0.97245 -1.12891,-1.18945c-6.829,-2.803 -11.07031,-8.18687 -11.07031,-14.04687c0,-8.797 9.421,-15.95312 21,-15.95312zM32.00391,19.22656c-3.15,0 -5.49364,1.24373 -6.43164,3.17773c-0.293,0.556 -0.4375,1.11414 -0.4375,1.74414c0,1.113 0.718,1.83008 1.875,1.83008c0.894,0 1.55197,-0.40966 1.91797,-1.34766c0.469,-1.304 1.43509,-2.00781 2.87109,-2.00781c1.612,0 2.72461,0.99759 2.72461,2.43359c0,1.348 -0.57094,2.07903 -2.46094,3.20703c-1.728,1.011 -2.62109,2.15381 -2.62109,3.88281v0.20508c0,1.201 0.73256,2.04978 1.97656,2.05078c1.031,0 1.60022,-0.5633 1.82422,-1.5293l0.00586,-0.02344c0.19,-1.23 0.63012,-1.86028 2.57813,-2.98828c2.066,-1.216 3.13672,-2.7255 3.13672,-4.9375c0,-3.413 -2.79899,-5.69727 -6.95898,-5.69727zM31.44922,36.32031c-1.319,0 -2.38867,1.00983 -2.38867,2.29883c0,1.289 1.06967,2.30078 2.38867,2.30078c1.333,0 2.40234,-1.01178 2.40234,-2.30078c0,-1.289 -1.06934,-2.29883 -2.40234,-2.29883z"></path>
//                             </g>
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
import { Component, Listen, State, h } from '@stencil/core';
@Component({
        tag: 'my-component'
    })
    export class MyToggleButton {
        // `isOpen` is decorated with `@State()`,
        // changes to it will trigger a rerender
        @State() isOpen: boolean = true;
        @State() counter: number = 1;

        @Listen('click', { capture: true })
        handleClick() {
            // whenever a click event occurs on
            // the component, update `isOpen`,
            // triggering the rerender

            this.isOpen = !this.isOpen;
            this.counter = this.counter + 1;
            console.log('click..', this.counter, this.isOpen);
        }

        render() {
            return <button>
                {this.counter}
            </button>;
        }
    }
