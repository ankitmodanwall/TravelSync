'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/auth-context';
import {
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { ChatMessage } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '../ui/skeleton';

interface TripChatProps {
  tripId: string;
}

function ChatSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
             <div className="flex items-start flex-row-reverse gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1 items-end flex flex-col">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
             <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                </div>
            </div>
        </div>
    )
}


export default function TripChat({ tripId }: TripChatProps) {
  const { user } = useAuth();
  const firestore = useFirestore();
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const messagesRef = useMemoFirebase(
    () => (firestore ? collection(firestore, `trips/${tripId}/chatMessages`) : null),
    [firestore, tripId]
  );

  const messagesQuery = useMemoFirebase(
    () => (messagesRef ? query(messagesRef, orderBy('timestamp', 'asc')) : null),
    [messagesRef]
  );

  const { data: messages, isLoading } = useCollection<ChatMessage>(messagesQuery);
  
  useEffect(() => {
    // Scroll to bottom when messages load or new messages arrive
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !messagesRef || newMessage.trim() === '') return;

    const messageData = {
      tripId,
      userId: user.uid,
      userName: user.name || user.email,
      userPhotoURL: user.photoURL,
      message: newMessage.trim(),
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(messagesRef, messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // You could add a toast notification here
    }
  };

  const getInitials = (name: string | null) => {
      if (!name) return 'U';
      return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  }

  return (
    <Card className="flex flex-col h-[70vh]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="text-primary" />
          Trip Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            {isLoading && <ChatSkeleton />}
            <div className="space-y-4">
                {messages?.map(msg => (
                <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                    user?.uid === msg.userId ? 'flex-row-reverse' : ''
                    }`}
                >
                    <Avatar>
                        <AvatarImage src={msg.userPhotoURL || undefined} />
                        <AvatarFallback>{getInitials(msg.userName)}</AvatarFallback>
                    </Avatar>
                    <div className={`p-3 rounded-lg max-w-[75%] ${
                        user?.uid === msg.userId
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                        <p className="text-sm">{msg.message}</p>
                    </div>
                </div>
                ))}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            disabled={!user}
          />
          <Button type="submit" size="icon" disabled={!user || newMessage.trim() === ''}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
