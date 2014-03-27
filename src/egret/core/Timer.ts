/**
 * Copyright (c) Egret-Labs.org. Permission is hereby granted, free of charge,
 * to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
module ns_egret {
    export class Timer extends ns_egret.EventDispatcher {
        public static ON_TIMER:string = "onTimer";
        private _preTime:number;
        private _passTime:number;
        private _totalActionTimes:number;

        constructor(private _actionInterval:number = 1000, private _actionTimes:number = -1) {
            super();
        }

        public start() {
            this._preTime = ns_egret.Ticker.now();
            if (this._actionTimes != 0) {
                this._actionTimes = 0;
                ns_egret.Ticker.getInstance().register(this.onEnterFrame, this);
            }
        }

        public stop() {
            ns_egret.Ticker.getInstance().unregister(this.onEnterFrame, this);
        }

        private onEnterFrame() {
            var now = ns_egret.Ticker.now();
            this._passTime = now - this._preTime;
            while (this._passTime > this._actionInterval) {
                this._passTime -= this._actionInterval;
                this.dispatchEvent(Timer.ON_TIMER);
                this._actionTimes++;
                if (this._actionTimes != -1 && this._actionTimes >= this._totalActionTimes) {
                    this.stop();
                    break;
                }
                this._preTime = now;
            }
        }
    }
}