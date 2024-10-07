'use client'
import Scene from "@/components/Scene";
import Moon from '@/components/Moon';
import TutorialComponent from "@/components/TutorialComponent";
import { useEffect, useState } from "react";

const Page = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Verifica se o usuário veio da Home
    const fromHome = sessionStorage.getItem('fromHome');
    if (fromHome === 'true') {
      setIsDialogOpen(true); // Abre o tutorial
      sessionStorage.removeItem('fromHome'); // Limpa o valor para não abrir de novo
    }
  }, []);
  
  return (
    <>
      <Scene enableControl={true}>
        <Moon isPageHome={false} />
      </Scene>
      <TutorialComponent isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </>
  );
};

export default Page;
