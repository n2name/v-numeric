let callback;

export default {
  name: "numeric",
  config: {},
  install(Vue) {
    Vue.directive("numeric", {
      bind: function(el, binding, vnode) {
        const setting = binding.value;
        if (!setting) {
          return;
        }

        const element = el;
        let lastValue = null;
        let min = Number.MIN_VALUE;
        let max = Number.MAX_VALUE;
        let decimal = 0;
        let bindObject;
        let lastBindItem = null;
        if (setting.min !== undefined && setting.min !== null) {
          min = Number(setting.min);
        }
        if (setting.max !== undefined && setting.max !== null) {
          max = Number(setting.max);
        }
        if (setting.decimal !== undefined && setting.decimal !== null) {
          decimal = parseInt(`${setting.decimal}`, 10);
        }
        if (setting.bind !== undefined && setting.bind !== null) {
          let data = setting.bind.split(".");
          lastBindItem = data.pop();
          bindObject = data.reduce((p, c) => {
            return p[c];
          }, vnode.context);
        }
        const process = () => {
          const numbered = Number(element.value);
          const dotSplits = `${element.value}`.split(".");
          const hasDot = element.value.indexOf(".") !== -1 && !isNaN(numbered);
          if (isNaN(numbered) || numbered < min || numbered > max) {
            element.value = lastValue;
          } else {
            const decimalPlaces =
              dotSplits.length > 1
                ? dotSplits[dotSplits.length - 1].substring(0, decimal)
                : "";
            const numericValue = Math.floor(numbered);
            element.value = hasDot
              ? `${numericValue}.${decimalPlaces}`
              : `${numericValue}`;
            lastValue = Number(element.value);
          }
          return lastValue;
        };
        const callback = () => {
          const initialValue = element.value;
          if (lastBindItem) {
            bindObject[lastBindItem] = initialValue === "" ? null : process();
          }
        };
        const isNumberKey = e => {
          const charCode = e.which ? e.which : e.keyCode;
          const value = e.target.value;

          if (decimal === 0 && charCode === 46) {
            e.preventDefault();
            return false;
          }
          const hasDot = value.indexOf(".") !== -1;
          if (hasDot && charCode === 46) {
            e.preventDefault();
            return false;
          } else if (charCode === 46) {
            return true;
          }
          if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
            return false;
          }
          return true;
        };

        if (lastBindItem) {
          element.value = `${bindObject[lastBindItem]}`;
        }
        el.addEventListener("keypress", isNumberKey);
        el.addEventListener("input", callback);
      }
    });
  }
};
