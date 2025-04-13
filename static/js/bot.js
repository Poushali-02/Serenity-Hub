document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }));
});
//upto this, navbar
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');

    function createMessageElement(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        return messageDiv;
    }

    function addMessage(text, isUser) {
        const messageElement = createMessageElement(text, isUser);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                addMessage("Thank you for sharing. Let's work through this together. What emotions are you feeling right now?", false);
            }, 1000);
        }
    }

    sendBtn.addEventListener('click', handleSendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    let isProcessing = false;

    function createMessageElement(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        return messageDiv;
    }

    function addMessage(text, isUser) {
        const messageElement = createMessageElement(text, isUser);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        if (isProcessing) return;
        
        const message = chatInput.value.trim();
        if (!message) return;

        isProcessing = true;
        sendBtn.disabled = true;
        
        // Add user message
        addMessage(message, true);
        
        // Simulate bot response
        setTimeout(() => {
            addMessage("Thank you for sharing. Let's work through this together...", false);
            isProcessing = false;
            sendBtn.disabled = false;
        }, 1000);

        chatInput.value = '';
    }

    sendBtn.addEventListener('click', handleSendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
});