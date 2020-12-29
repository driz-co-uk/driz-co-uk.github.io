"use strict";

function _defineProperty(obj, key, value, accessor) {
    if (accessor == "getter") {
        Object.defineProperty(obj, key, {
            get: value,
            enumerable: true,
            configurable: true,
        });
    } else if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

(() => {
    var _temp;
    const application = Stimulus.Application.start();

    _temp = class extends Stimulus.Controller {
        //static targets = ["slide"];
        //static values = { index: Number };

        // static get targets() {
        //     return ["slide"];
        // }

        // static get values() {
        //     return { index: Number }
        // }

        connect() {
            this.startSlider();
        }

        disconnect() {
            this.stopSlider();
        }

        startSlider() {
            // set a timer that runs every 3 seconds
            this.refreshTimer = setInterval(() => {
                this.nextSlide(); // call the next slide
            }, 3000);
        }

        stopSlider() {
            if (this.refreshTimer) {
                clearInterval(this.refreshTimer);
            }
        }

        nextSlide() {
            // if the indexValue matches the last index
            if (this.indexValue >= (this.slideTargets.length - 1)) {
                this.indexValue = 0; // reset back to 0
            } else {
                this.indexValue++; // increment the index
            }
        }

        // stimulus automatically calls this method when the indexValue changes
        indexValueChanged() {
            this.showCurrentSlide();
        }

        showCurrentSlide() {
            // for each slide target
            this.slideTargets.forEach((element, index) => {
                // change its hidden attribute depending if its index matches the current indexValue
                // element.hidden = index != this.indexValue;
                element.classList.toggle('slide--visible', index == this.indexValue);
            });
        }
    }

    // define static getters
    _defineProperty(_temp, 'targets', () => {
        return ['slide'];
    }, 'getter');

    _defineProperty(_temp, 'values', () => {
        return { index: Number };
    }, 'getter');

    application.register("slider", _temp);
})();