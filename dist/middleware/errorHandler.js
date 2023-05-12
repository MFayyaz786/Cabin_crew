"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const upper_case_first_1 = require("upper-case-first"); // assuming you have installed the 'upper-case-first' package
exports.default = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // ERROR HANDLER
    console.log(err);
    if (err && err.code === 11000) {
        let errorKey = Object.keys(err['keyPattern']).toString();
        errorKey = (0, upper_case_first_1.upperCaseFirst)(errorKey);
        res.status(400).send({ msg: `${errorKey} already exists` });
    }
    if (err.name === 'ValidationError') {
        // const errorMessages = Object.values(err.errors).map((val: any) => val.message);
        // const uniqueKeyErrors = Object.keys(err.errors).filter((key: string) =>
        //   err.errors[key].properties?.unique === true
        // );
        // if (uniqueKeyErrors.length > 0) {
        //   const errorKey = upperCaseFirst(uniqueKeyErrors[0]);
        //   res.status(400).send({ msg: `${errorKey} already exists` });
        // } else {
        //   res.status(400).send({ msg: errorMessages });
        // }
        res.status(400).send({
            msg: Object.values(err.errors).map((val) => val.message),
        });
    }
    else {
        res.status(400).send({ msg: err.message });
    }
});
