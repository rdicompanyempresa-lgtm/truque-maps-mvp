'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Circle, MapPin, Route, Share2, Shield, ChevronRight, Home, BookOpen } from 'lucide-react'

interface Module {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  content: {
    sections: {
      title: string
      content: string
      tips?: string[]
    }[]
  }
  completed: boolean
}

export default function GoogleMapsTricksApp() {
  const [currentView, setCurrentView] = useState<'home' | 'module'>('home')
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  const modules: Module[] = [
    {
      id: 'welcome',
      title: 'Boas-vindas e Aviso Legal',
      description: 'Introdução sobre uso responsável do Google Maps',
      icon: <Shield className="w-6 h-6" />,
      content: {
        sections: [
          {
            title: 'Bem-vindo ao Truque do Google Maps!',
            content: 'Este aplicativo foi criado para ensinar você a usar o Google Maps de forma mais eficiente e responsável. Nosso objetivo é mostrar recursos avançados que podem facilitar seu dia a dia.',
          },
          {
            title: 'Uso Ético e Responsável',
            content: 'É fundamental usar o Google Maps de forma ética. Sempre respeite a privacidade das pessoas e use as informações de localização apenas para fins legítimos.',
            tips: [
              'Nunca compartilhe a localização de outras pessoas sem permissão',
              'Use recursos de localização apenas quando necessário',
              'Respeite áreas privadas e restritas',
              'Mantenha suas informações pessoais seguras'
            ]
          },
          {
            title: 'Termos de Uso',
            content: 'Ao usar este aplicativo, você concorda em utilizar o Google Maps seguindo os termos de serviço do Google e as leis locais aplicáveis.',
          }
        ]
      },
      completed: false
    },
    {
      id: 'fundamentals',
      title: 'Fundamentos do Google Maps',
      description: 'Como usar mapas e marcadores eficientemente',
      icon: <MapPin className="w-6 h-6" />,
      content: {
        sections: [
          {
            title: 'Navegação Básica',
            content: 'O Google Maps oferece várias formas de navegar e visualizar informações. Aprenda a usar gestos, zoom e diferentes visualizações.',
            tips: [
              'Use dois dedos para rotacionar o mapa',
              'Toque duas vezes para dar zoom rápido',
              'Use o modo satélite para ver detalhes do terreno',
              'Ative o modo 3D para uma visão mais realista'
            ]
          },
          {
            title: 'Marcadores e Pontos de Interesse',
            content: 'Os marcadores ajudam a identificar locais importantes. Você pode criar marcadores personalizados e salvar lugares favoritos.',
            tips: [
              'Toque e segure para criar um marcador personalizado',
              'Salve lugares frequentes na sua lista',
              'Use rótulos para organizar seus marcadores',
              'Compartilhe marcadores com amigos e família'
            ]
          },
          {
            title: 'Camadas do Mapa',
            content: 'O Google Maps oferece diferentes camadas de informação como trânsito, transporte público e ciclismo.',
            tips: [
              'Ative a camada de trânsito para ver congestionamentos',
              'Use a camada de transporte público para planejar viagens',
              'A camada de ciclismo mostra ciclovias e rotas seguras',
              'Explore a camada de terreno para atividades ao ar livre'
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 'routes',
      title: 'Rotas e Direções',
      description: 'Traçar caminhos otimizados e eficientes',
      icon: <Route className="w-6 h-6" />,
      content: {
        sections: [
          {
            title: 'Planejamento de Rotas',
            content: 'Aprenda a criar rotas eficientes considerando diferentes meios de transporte e condições de trânsito.',
            tips: [
              'Compare rotas de carro, transporte público e a pé',
              'Verifique o tempo estimado em diferentes horários',
              'Adicione paradas intermediárias na sua rota',
              'Salve rotas frequentes para acesso rápido'
            ]
          },
          {
            title: 'Rotas Alternativas',
            content: 'O Google Maps sempre oferece rotas alternativas. Saiba como escolher a melhor opção para cada situação.',
            tips: [
              'Analise as opções considerando tempo e distância',
              'Evite pedágios quando necessário',
              'Prefira rodovias ou ruas locais conforme sua preferência',
              'Considere condições climáticas na escolha da rota'
            ]
          },
          {
            title: 'Navegação em Tempo Real',
            content: 'Durante a navegação, o Google Maps oferece informações em tempo real sobre trânsito, acidentes e obras.',
            tips: [
              'Mantenha o GPS ativo para receber atualizações',
              'Aceite sugestões de rotas alternativas quando apropriado',
              'Use comandos de voz para navegação segura',
              'Compartilhe seu tempo estimado de chegada'
            ]
          }
        ]
      },
      completed: false
    },
    {
      id: 'sharing',
      title: 'Compartilhamento de Localização',
      description: 'Como ativar o recurso com permissão adequada',
      icon: <Share2 className="w-6 h-6" />,
      content: {
        sections: [
          {
            title: 'Compartilhamento Responsável',
            content: 'O compartilhamento de localização é uma ferramenta poderosa que deve ser usada com cuidado e apenas com pessoas de confiança.',
            tips: [
              'Compartilhe apenas com pessoas de confiança',
              'Defina um tempo limite para o compartilhamento',
              'Revise regularmente quem tem acesso à sua localização',
              'Use apenas quando realmente necessário'
            ]
          },
          {
            title: 'Como Compartilhar Sua Localização',
            content: 'Aprenda o processo passo a passo para compartilhar sua localização de forma segura.',
            tips: [
              'Abra o Google Maps e toque no seu perfil',
              'Selecione "Compartilhamento de localização"',
              'Escolha por quanto tempo deseja compartilhar',
              'Selecione os contatos autorizados'
            ]
          },
          {
            title: 'Gerenciando Permissões',
            content: 'Mantenha controle total sobre quem pode ver sua localização e por quanto tempo.',
            tips: [
              'Revise as permissões regularmente',
              'Remova acesso quando não for mais necessário',
              'Use compartilhamento temporário para situações específicas',
              'Configure notificações para lembrar de revisar permissões'
            ]
          }
        ]
      },
      completed: false
    }
  ]

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('googleMapsProgress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Salvar progresso no localStorage
  const updateProgress = (moduleId: string, completed: boolean) => {
    const newProgress = { ...progress, [moduleId]: completed }
    setProgress(newProgress)
    localStorage.setItem('googleMapsProgress', JSON.stringify(newProgress))
  }

  const completedModules = Object.values(progress).filter(Boolean).length
  const progressPercentage = (completedModules / modules.length) * 100

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    setCurrentView('module')
  }

  const handleCompleteModule = (moduleId: string) => {
    updateProgress(moduleId, true)
    setCurrentView('home')
    setSelectedModule(null)
  }

  const currentModule = modules.find(m => m.id === selectedModule)

  if (currentView === 'module' && currentModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center text-[#4285F4] hover:text-[#3367D6] transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Voltar
            </button>
            <div className="flex items-center text-[#34A853]">
              {currentModule.icon}
              <span className="ml-2 font-inter font-semibold">{currentModule.title}</span>
            </div>
          </div>

          {/* Conteúdo do Módulo */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {currentModule.content.sections.map((section, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <h2 className="text-2xl font-inter font-bold text-gray-800 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-[#4285F4] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    {section.title}
                  </h2>
                  
                  <p className="text-gray-600 font-inter leading-relaxed mb-4">
                    {section.content}
                  </p>

                  {section.tips && (
                    <div className="bg-gradient-to-r from-[#FBBC04]/10 to-[#EA4335]/10 rounded-xl p-4">
                      <h3 className="font-inter font-semibold text-gray-800 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-[#FBBC04] rounded-full mr-2"></div>
                        Dicas Importantes:
                      </h3>
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start text-gray-600 font-inter">
                            <CheckCircle className="w-4 h-4 text-[#34A853] mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Botão de Conclusão */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleCompleteModule(currentModule.id)}
                  className="w-full bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-inter font-semibold py-4 px-6 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Marcar como Concluído
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-inter font-bold text-gray-800 mb-4">
            Truque do Google Maps
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-inter max-w-2xl mx-auto leading-relaxed">
            Aprenda a usar o Google Maps de forma avançada e responsável. 
            Descubra recursos que vão facilitar sua navegação e planejamento de rotas.
          </p>
        </div>

        {/* Barra de Progresso */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-inter font-semibold text-gray-800">Seu Progresso</h3>
              <span className="text-[#4285F4] font-inter font-bold">
                {completedModules}/{modules.length} módulos
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#4285F4] to-[#34A853] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 font-inter mt-2">
              {progressPercentage === 100 ? 'Parabéns! Você concluiu todos os módulos!' : 
               `${Math.round(progressPercentage)}% concluído`}
            </p>
          </div>
        </div>

        {/* Módulos */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-inter font-bold text-gray-800 mb-8 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-[#4285F4]" />
            Módulos de Aprendizado
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleModuleClick(module.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-xl flex items-center justify-center text-white shadow-md">
                        {module.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-inter font-bold text-gray-800 text-lg group-hover:text-[#4285F4] transition-colors">
                          {module.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {progress[module.id] ? (
                        <CheckCircle className="w-6 h-6 text-[#34A853]" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-inter font-medium ${
                      progress[module.id] 
                        ? 'bg-[#34A853]/10 text-[#34A853]' 
                        : 'bg-[#FBBC04]/10 text-[#EA4335]'
                    }`}>
                      {progress[module.id] ? 'Concluído' : 'Pendente'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4285F4] transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 font-inter">
            Use o Google Maps de forma ética e responsável. 
            <br className="md:hidden" />
            Respeite sempre a privacidade e os direitos dos outros.
          </p>
        </div>
      </div>
    </div>
  )
}