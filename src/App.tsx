



import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'


import Compiler from './pages/Compiler'
import NotFound from './pages/NotFound'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner'


import Ai from './components/ai/Ai'
import Chatbot from './components/ai/Chatbot'
import TextSummarizer from './components/ai/TextSummarizer'
import CodeCreator from './components/ai/CodeCreator'
import ImageGenerator from './components/ai/ImageGenerator'
import TextAudio from './components/ai/TextAudio'








const App = () => {
  return (
    <>
      <Toaster position='bottom-right' theme='dark'/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compiler" element={<Compiler />} />

          <Route path="/ai" element={<Ai />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/text-summarizer" element={<TextSummarizer />} />
          <Route path="/code-creator" element={<CodeCreator />} />
          <Route path="/image-generator" element={<ImageGenerator />} />
          <Route path="/text-audio" element={<TextAudio />} />

          <Route path="/compiler/:urlId" element={<Compiler />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </ThemeProvider>
      <div>Hello</div>
    </>
  );
}

export default App