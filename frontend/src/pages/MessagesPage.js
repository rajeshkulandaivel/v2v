import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Search, MoreVertical, Phone, Video } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { useAuth } from '../context/AuthContext';
import { mockMessages, mockProperties } from '../mockData';

const MessagesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Transform mock messages into conversations
    const conversationData = mockMessages.map(convo => {
      const property = mockProperties.find(p => p.id === convo.propertyId);
      return {
        id: convo.id,
        property: property,
        host: property?.host,
        lastMessage: convo.messages[convo.messages.length - 1],
        messages: convo.messages,
        unreadCount: convo.messages.filter(m => !m.read && m.senderId !== user.id).length
      };
    });

    setConversations(conversationData);
    if (conversationData.length > 0) {
      setSelectedConversation(conversationData[0]);
    }
  }, [user, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: `m_${Date.now()}`,
      senderId: user.id,
      text: messageText,
      timestamp: new Date(),
      isHost: false,
      read: false
    };

    const updatedConversations = conversations.map(convo => {
      if (convo.id === selectedConversation.id) {
        return {
          ...convo,
          messages: [...convo.messages, newMessage],
          lastMessage: newMessage
        };
      }
      return convo;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: newMessage
    });
    setMessageText('');

    // Simulate host reply after 2 seconds
    setTimeout(() => {
      const hostReply = {
        id: `m_${Date.now() + 1}`,
        senderId: selectedConversation.host.id || 'host1',
        text: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(),
        isHost: true,
        read: false
      };

      setConversations(prev => prev.map(convo => {
        if (convo.id === selectedConversation.id) {
          return {
            ...convo,
            messages: [...convo.messages, newMessage, hostReply],
            lastMessage: hostReply
          };
        }
        return convo;
      }));

      setSelectedConversation(prev => ({
        ...prev,
        messages: [...prev.messages, hostReply],
        lastMessage: hostReply
      }));
    }, 2000);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastSeen = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return messageTime.toLocaleDateString('en-IN');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Header */}
        <div className="flex items-center mb-6 md:hidden">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-200px)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-full md:w-1/3 border-r border-gray-200 ${selectedConversation && 'hidden md:block'}`}>
              <div className="p-4 border-b border-gray-200">
                <div className="hidden md:block">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="overflow-y-auto h-full">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-600 text-sm">
                      When you contact a host or send a reservation request, you'll see your messages here.
                    </p>
                  </div>
                ) : (
                  conversations.map(conversation => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-rose-50 border-rose-200' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.host?.avatar} alt={conversation.host?.name} />
                          <AvatarFallback>{conversation.host?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 truncate">
                              {conversation.host?.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatLastSeen(conversation.lastMessage?.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 truncate mb-1">
                            {conversation.property?.title}
                          </p>
                          
                          <p className="text-sm text-gray-500 truncate">
                            {conversation.lastMessage?.text}
                          </p>
                        </div>
                        
                        {conversation.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${!selectedConversation && 'hidden md:flex'}`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          className="md:hidden p-2"
                          onClick={() => setSelectedConversation(null)}
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </Button>
                        
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedConversation.host?.avatar} alt={selectedConversation.host?.name} />
                          <AvatarFallback>{selectedConversation.host?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <p className="font-semibold text-gray-900">{selectedConversation.host?.name}</p>
                          <p className="text-sm text-gray-600">{selectedConversation.property?.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === user.id
                              ? 'bg-rose-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user.id ? 'text-rose-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="bg-rose-500 hover:bg-rose-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;