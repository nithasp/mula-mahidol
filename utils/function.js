export const wrapperSuccessResp = (resp) => {
   return {
      statusCode: 200,
      message: "success",
      data: resp.data,
      translation: "",
   };
};

export const wrapperErrorResp = (error) => {
   return {
      statusCode: error.response.status,
      message: typeof error.response.data === "object" ? error.response.data.error.message : "",
      data: {},
      translation: typeof error.response.data === "object" ? error.response.data.error.translation : "",
   };
};

export const formatFileSize = (size) => {
   const units = ["bytes", "KB", "MB", "GB", "TB"];
   let index = 0;
   let formattedSize = size;

   while (formattedSize >= 1024 && index < units.length - 1) {
      formattedSize /= 1024;
      index++;
   }

   return `${formattedSize?.toFixed(2)} ${units[index]}`;
};

export const convertObjToQueryString = (params) => {
   const queryString = Object.keys(params)
      .filter((key) => params[key] !== "" && params[key] !== 0)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
      .join("&");

   return queryString;
};

export const getNumCountPagination = (index, currentPage, pageSize) => {
   const baseIndex = (currentPage - 1) * pageSize;
   const rowNumber = baseIndex + index + 1;
   return rowNumber;
};

export const debounce = (fn, delay) => {
   let timeout;
   return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
   };
};
