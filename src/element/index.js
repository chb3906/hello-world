import {
  Input,
  Dialog,
  Checkbox,
  Cascader,
  DatePicker,
  Upload,
  Button,
  Pagination,
} from "element-ui";
const element = {
  install: function(Vue) {
    Vue.use(Input);
    Vue.use(Dialog);
    Vue.use(Checkbox);
    Vue.use(Cascader);
    Vue.use(DatePicker);
    Vue.use(Upload);
    Vue.use(Button);
    Vue.use(Pagination);
  }
};

export default element;
