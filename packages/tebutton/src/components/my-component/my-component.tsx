import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
        tag: 'my-component',
        styleUrl: 'my-component.css',
        shadow: true,
    })
    export class MyComponent {
    /**
     * The first name
     */
    @Prop() first: string;

    /**
     * The middle name
     */
    @Prop() middle: string;

    /**
     * The last name
     */
    @Prop() last: string;

    private getText(): string {
        return format(this.first, this.middle, this.last);
    }

    render() {
        return (
            <section class="tchat">
                <div>Hello, World! I'm {this.getText()}</div>;
                <div class="tchat_wrap none" id="tchat_wrap">
                    <iframe src="https://tchat.scope.cf:5001/tchat" frameborder="0" scrolling="no"> </iframe>
                    <div class="tchat_wrap-close" id="tchat_close"></div>
                </div>
                <div class="tchat_icon" id="tchat_button">
                    <div class="tchat_icon-ring"></div>
                    <div class="tchat_icon-button"></div>
                </div>
            </section>
        )
    }
}
