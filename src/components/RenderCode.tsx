import { RootState } from "@/redux/store";

import { useSelector } from "react-redux";

const RenderCode = () => {
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const combinedCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script>></html>`;

  const iframeCode = ` data:text/html;cherset=utf-8,${encodeURIComponent(
    combinedCode
  )}`;

  return (
    <div className="bg-white  h-[calc(100dvh-60px)]">
      <iframe className="w-full h-full" src={iframeCode} />
    </div>
  );
};

export default RenderCode;
