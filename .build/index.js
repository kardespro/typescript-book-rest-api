var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var import_express = __toModule(require("express"));
var import_dotenv = __toModule(require("dotenv"));
var import_axios = __toModule(require("axios"));
import_dotenv.default.config();
const app = (0, import_express.default)();
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.get("/api/_v1/_ping-callback", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.get("/api/_v1/_books/search", async (req, res) => {
  let q = req.query._q;
  let f = req.query.filter;
  let sort = req.query.sort;
  let proj = req.query.projection;
  if (!q)
    return res.json({ status: 404, message: "Query Error" });
  let d = await import_axios.default.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
  let p = d.data;
  if (f) {
    let ft = await import_axios.default.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&filter=${f}`);
    res.json({
      status: 200,
      sortType: sort || "Not Found",
      filterType: f,
      projection: proj || "Not Found",
      message: ft.data
    });
  }
  if (sort) {
    let s = await import_axios.default.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&orderBy=${sort}`);
    res.json({
      status: 200,
      sortType: sort,
      filterType: f || "Not Found",
      projection: proj || "Not Found",
      message: s.data
    });
  }
  if (proj) {
    let prj = await import_axios.default.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&projection=${proj}`);
    res.json({
      status: 200,
      sortType: sort || "Not Found",
      filterType: f || "Not Found",
      projection: proj,
      message: prj.data
    });
  }
  res.json({ status: 200, sortType: "Not Found", filterType: "Not Found", projection: "Not Found", message: p });
});
app.listen(3e3, () => {
  console.log(`\u26A1\uFE0F[server]: Server is running at https://localhost:3000`);
});
//# sourceMappingURL=index.js.map
