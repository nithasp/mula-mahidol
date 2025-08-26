export default defineAppConfig({
   ui: {
      primary: "primaryy",
      gray: "grayy",
      purple: "purple",
      notifications: {
         position: "top-0 bottom-auto",
      },
      formGroup: {
         label: {
            base: "font-kanit-medium text-grayy-400",
         },
      },
      input: {
         default: {
            variant: "outline",
            color: "white",
         },
         base: "px-3.5 py-2.5",
         placeholder: "placeholder-text-grayy-75",
      },
      select: {
         placeholder: "text-grayy-75",
      },
      table: {
         thead: 'bg-[#B1DAFF]',
         tbody: 'border-none',
         th: {
            base: "text-left rtl:text-right",
            padding: "px-4 py-3.5",
            color: "text-[#152536]",
            font: "font-normal",
            size: "text-xs",
         },
         td: {
            color: "text-grayy-400",
         }
      },
      dropdown: {
         rounded: "rounded-lg",
         width: "",
         item: {
            base: "hover:bg-grayy-50",
            label: "font-kanit-medium text-grayy-400 ml-1",
            size: "text-sm",
            avatar: {
               base: "[&_img]:rounded-none [&_img]:w-4 [&_img]:h-4",
            },
            padding: "p-[8px_6px_8px_12px]",
         },
      },
      button: {
         base: "[&_span]:font-kanit-semibold !bg-primaryy-500 hover:!bg-[#8a6e2b]",
      },
      divider: {
         border: {
            base: 'border-primaryy-500'
         }
      }
   },
});
