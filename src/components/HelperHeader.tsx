import  { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Copy, Save, Share2 } from "lucide-react";
import axios from "axios";
import { Code } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const HelperHeader = () => {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false)

  const navigate = useNavigate();
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const {urlId } = useParams()
  useEffect(() => {
    if (urlId) {
      setShareBtn(true)
    } else {
      setShareBtn(false)
    }
  },[urlId])

  const handleSaveCode = async () => {
    setSaveLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/compiler/save", {
        fullCode: fullCode,
      });
      console.log(response.data);
      navigate(`/compiler/${response.data.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    } finally {
      setSaveLoading(false);
    }
  };
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
      <div className="__btn_container flex gap-1">
        <Button
          onClick={handleSaveCode}
          className="flex justify-center items-center gap-1"
          variant="success"
          disabled={saveLoading}
        >
          <Save size={16} />
          {saveLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger className=" whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1">
              <Share2 size={16} />
              Share
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Code />
                  Shere your code!
                </DialogTitle>
                <DialogDescription className="flex-col gap-2">
                  <div className="__url flex gap-1">
                    <input
                      type="text"
                      disabled
                      className="w-full px-2 py-2 rounded bg-slate-800 text-slate-400  select-none"
                      value={window.location.href}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        );
                        toast("URL Copied to your clipboard!");
                      }}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>

                  <p className="text-center">
                    Share this URL with friends to collaborate.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="__tab_switcher flex justify-center items-center gap-1">
        <small className="">Current Language</small>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            )
          }
        >
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;
