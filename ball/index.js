/**
 * @param t 动画已消耗的时间
 * @param b 小球原始位置
 * @param c 小球目标位置
 * @param d 动画持续的总时间
 */
const tween = {
    linear: function (t, b, c, d) {
        return c * t/d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};
const Animate = function (dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
};
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];

    const self = this;
    const timeId = setInterval(function () {
        if (self.step() === false) {
            clearInterval(timeId);
        }
    }, 19);
};
Animate.prototype.step = function() {
    const t = +new Date;
    if (t >= this.startTime + this.duration) {
        this.update(this.endPos);
        return false;
    }
    const pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    this.update(pos);
};
Animate.prototype.update = function (pos) {
    this.dom.style[this.propertyName] = pos + 'px';
}