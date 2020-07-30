'use strict';

let errors = [];

function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0)
    errors.push({
      message: message
    });
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min)
    errors.push({
      message: message
    });
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max)
    errors.push({
      message: message
    });
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
  if (value.length != len)
    errors.push({
      message: message
    });
}

ValidationContract.prototype.isEmail = (value, message) => {
  var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value))
    errors.push({
      message: message
    });
}

ValidationContract.prototype.isAccountNumber = (value, message) => {
  var reg = new RegExp(/^[0-9]{7,14}$/);
  if (!reg.test(value))
    errors.push({
      message: message
    });
}

ValidationContract.prototype.isTaxInformation = (value, message) => {
  var taxArr = ['Tax0', 'Tax1', 'Tax2', 'Tax3'];
  if (!taxArr.includes(value))
    errors.push({
      message: message
    });
}

ValidationContract.prototype.errors = () => {
  return errors;
}

ValidationContract.prototype.clear = () => {
  errors = [];
}

ValidationContract.prototype.isValid = () => {
  return errors.length == 0;
}

export default ValidationContract;