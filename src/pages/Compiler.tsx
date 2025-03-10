import CodeEditor from '@/components/CodeEditor'
import HelperHeader from '@/components/HelperHeader';
import RenderCode from '@/components/RenderCode';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'




const Compiler = () => {
  
  return (
    <ResizablePanelGroup
    direction="horizontal"
    className="   "
  >
    <ResizablePanel className='h-[calc(100vh-60px)] min-w-[350px]' defaultSize={50}>
      

      
      <HelperHeader/>
      <CodeEditor/>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel className='h-[calc(100vh-60px)] min-w-[350px]' defaultSize={50}>
    
    <RenderCode/>
    </ResizablePanel>
  </ResizablePanelGroup>
  )
}

export default Compiler