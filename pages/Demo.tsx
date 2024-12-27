import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Phone, MessageCircle, Calendar, Users, Clock } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import AnimatedBackground from '@/components/AnimatedBackground';
import { vapiService } from '@/services/vapiService';

interface Message {
  id: string;
  type: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

export default function Demo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Bonjour, je suis l'assistant IA-26 du restaurant La Table d'Or. Pour tester notre service, vous pouvez soit simuler une conversation ici, soit recevoir un appel de démonstration sur votre téléphone.",
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'success' | 'error'>('idle');

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5)}`;
    return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 10) {
      setPhoneNumber(formatted);
    }
  };

  const simulateResponse = async (userMessage: string) => {
    setIsProcessing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let response = '';
    if (userMessage.toLowerCase().includes('réservation')) {
      response = "Je peux vous aider à faire une réservation. Pour combien de personnes souhaitez-vous réserver ?";
    } else if (userMessage.toLowerCase().includes('menu')) {
      response = "Notre menu change quotidiennement selon les produits frais du marché. Aujourd'hui, nous proposons en entrée une burrata avec tomates anciennes, en plat un filet de bar avec légumes de saison, et en dessert un soufflé au chocolat.";
    } else if (userMessage.toLowerCase().includes('horaires')) {
      response = "Nous sommes ouverts du mardi au samedi, de 12h à 14h30 et de 19h à 22h30. Le restaurant est fermé le dimanche et le lundi.";
    } else {
      response = "Je suis là pour vous aider avec vos réservations et répondre à vos questions sur notre restaurant. N'hésitez pas à me demander des informations sur notre menu, nos horaires ou pour faire une réservation.";
    }

    setMessages(prev => [...prev, 
      {
        id: Date.now().toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }
    ]);
    
    setIsProcessing(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).message;
    const message = input.value.trim();
    
    if (!message) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }]);

    input.value = '';
    simulateResponse(message);
  };

  const handlePhoneDemo = async () => {
    if (!phoneNumber || phoneNumber.replace(/\s/g, '').length !== 10) return;

    setCallStatus('calling');
    try {
      const response = await vapiService.initiateCall(phoneNumber);
      
      if (response.success) {
        setCallStatus('success');
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'assistant',
          content: `Un appel de démonstration va être effectué au ${phoneNumber}. Notre assistant vous guidera pour une simulation de réservation.`,
          timestamp: new Date()
        }]);
      } else {
        setCallStatus('error');
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'assistant',
          content: "Désolé, une erreur est survenue lors de l'appel. Veuillez réessayer.",
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      setCallStatus('error');
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Désolé, une erreur est survenue lors de l'appel. Veuillez réessayer.",
        timestamp: new Date()
      }]);
    } finally {
      setTimeout(() => setCallStatus('idle'), 3000);
    }
  };

  return (
    <main className="relative min-h-screen pt-20">
      <AnimatedBackground />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Démonstration Interactive
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Découvrez comment IA-26 gère vos réservations et interactions clients
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Demo */}
          <Card className="h-[600px] flex flex-col">
            <div className="flex items-center space-x-3 p-4 border-b border-white/10">
              <Bot className="w-6 h-6 text-primary-400" />
              <div>
                <h2 className="text-lg font-semibold text-white">Assistant IA-26</h2>
                <p className="text-sm text-white/60">Restaurant La Table d'Or</p>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-xl ${
                    message.type === 'user'
                      ? 'bg-primary-400 text-dark-800'
                      : 'bg-white/10 text-white'
                  }`}>
                    <p>{message.content}</p>
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-white/60"
                >
                  <Bot className="w-4 h-4 animate-pulse" />
                  <span>En train d'écrire...</span>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <Input
                  name="message"
                  placeholder="Tapez votre message..."
                  disabled={isProcessing}
                />
                <Button type="submit" disabled={isProcessing}>
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </Card>

          {/* Phone Demo */}
          <div className="space-y-8">
            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Démo par Téléphone
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Votre numéro de téléphone
                  </label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="06 12 34 56 78"
                    disabled={callStatus === 'calling'}
                  />
                </div>
                <Button
                  onClick={handlePhoneDemo}
                  isLoading={callStatus === 'calling'}
                  disabled={phoneNumber.replace(/\s/g, '').length !== 10 || callStatus === 'calling'}
                  className="w-full"
                  variant={
                    callStatus === 'success' ? 'primary' :
                    callStatus === 'error' ? 'secondary' :
                    'primary'
                  }
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {callStatus === 'calling' ? 'Appel en cours...' :
                   callStatus === 'success' ? 'Appel lancé !' :
                   callStatus === 'error' ? 'Erreur - Réessayer' :
                   'Recevoir un appel de démonstration'}
                </Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold text-white mb-6">
                Fonctionnalités Démontrées
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Calendar,
                    title: "Gestion des Réservations",
                    description: "Prise de réservation intelligente avec gestion des disponibilités"
                  },
                  {
                    icon: MessageCircle,
                    title: "Réponses Naturelles",
                    description: "Compréhension du langage naturel et réponses contextuelles"
                  },
                  {
                    icon: Clock,
                    title: "Disponibilité 24/7",
                    description: "Assistant disponible à tout moment pour vos clients"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl"
                  >
                    <div className="p-2 bg-primary-400/20 rounded-lg">
                      <feature.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-white/60">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </main>
  );
}