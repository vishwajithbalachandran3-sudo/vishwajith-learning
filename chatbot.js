(() => {
  const topics = [
    { keys: ['what is this', 'what is thecybersol', 'what do you do', 'about thecybersol'], summary: 'thecybersol provides two AI-powered solutions: Cybersecurity Operations for detecting and responding to threats, and Jira AI Integration for automating ticket workflows.', benefit: 'It helps teams complete repetitive operational work faster, organize information clearly, and focus people on higher-value decisions. Cyber teams can respond to threats sooner, while Jira teams can reduce manual ticket handling.' },
    { keys: ['cyber', 'security', 'threat', 'soc'], summary: 'Our Cybersecurity Operations platform unifies detection, investigation, automation, exposure management, and security data.', benefit: 'It helps security teams reduce alert noise, investigate incidents faster, and coordinate response from one place. That means less manual work and quicker containment of real threats.' },
    { keys: ['jira', 'ticket', 'workflow'], summary: 'The Jira AI Integration creates, enriches, prioritizes, and routes Jira issues through intelligent virtual agents. It also supports status synchronization and clear audit trails.', benefit: 'It reduces repetitive ticket work, improves routing accuracy, and keeps Jira records current. Teams spend less time updating issues and more time resolving them.' },
    { keys: ['alert iq', 'alertiq', 'analyst', 'agent'], summary: 'Alert iQ is our AI security teammate. It investigates alerts, builds attack timelines, recommends response actions, and works across identity, endpoint, cloud, and network signals.', benefit: 'Alert iQ gives analysts a faster, clearer starting point for every incident. It correlates signals, explains what happened, and recommends next steps—reducing investigation time while keeping people in control of important decisions.' }
  ];
  const directAnswers = [
    { keys: ['demo', 'meeting', 'walkthrough'], text: 'To arrange a personalized demo, email info@thecybersol.com. You can copy the address from the Contact section.' },
    { keys: ['career', 'job', 'apply', 'resume'], text: 'Visit our Careers page to view open roles. Select a position, complete the application, and attach your résumé in PDF, DOC, or DOCX format.' },
    { keys: ['price', 'pricing', 'cost'], text: 'Pricing depends on your environment, integrations, and operational goals. Email info@thecybersol.com for a tailored conversation.' },
    { keys: ['contact', 'email', 'support'], text: 'Contact our team at info@thecybersol.com.' },
    { keys: ['privacy', 'legal', 'trust', 'secure'], text: 'Our Privacy, Legal, and Trust Center pages explain our approach to data handling, responsible AI, and security.' }
  ];
  const shell = document.createElement('div');
  shell.innerHTML = '<button class="chat-launcher" aria-label="Open chat" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg></button><section class="chat-panel" aria-label="thecybersol assistant" aria-hidden="true"><header class="chat-head"><span class="chat-avatar">iQ</span><span class="chat-title"><b>thecybersol assistant</b><small>ONLINE</small></span><button class="chat-close" aria-label="Close chat">×</button></header><div class="chat-messages" aria-live="polite"><div class="chat-message bot">Hi, how can I help you?</div></div><div class="chat-quick"><button>Cyber Operations</button><button>Jira integration</button><button>Careers</button><button>Contact</button></div><form class="chat-form"><input aria-label="Chat message" placeholder="Ask a question…" autocomplete="off"><button class="chat-send" aria-label="Send message">↑</button></form><p class="chat-note">Automated website assistant · Do not share sensitive information</p></section>';
  document.body.append(...shell.children);
  const launch = document.querySelector('.chat-launcher');
  const panel = document.querySelector('.chat-panel');
  const messages = document.querySelector('.chat-messages');
  const form = document.querySelector('.chat-form');
  const input = form.querySelector('input');
  let activeTopic = null;
  function toggle(open) {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launch.setAttribute('aria-expanded', String(open));
    if (open) setTimeout(() => input.focus(), 200);
  }
  function answer(question) {
    const query = question.toLowerCase().trim();
    const topic = topics.find(item => item.keys.some(key => query.includes(key)));
    if (topic) { activeTopic = topic; return topic.summary; }
    const followUp = ['useful', 'benefit', 'help', 'why', 'value', 'advantage'].some(key => query.includes(key));
    if (followUp && activeTopic) return activeTopic.benefit;
    const direct = directAnswers.find(item => item.keys.some(key => query.includes(key)));
    if (direct) return direct.text;
    return 'I’m not certain about that yet. Please email info@thecybersol.com and our team will help you.';
  }
  function reply(question) {
    const user = document.createElement('div');
    user.className = 'chat-message user';
    user.textContent = question;
    messages.appendChild(user);
    messages.scrollTop = messages.scrollHeight;
    setTimeout(() => {
      const bot = document.createElement('div');
      bot.className = 'chat-message bot';
      bot.textContent = answer(question);
      messages.appendChild(bot);
      messages.scrollTop = messages.scrollHeight;
    }, 250);
  }
  launch.addEventListener('click', () => toggle(!panel.classList.contains('open')));
  document.querySelector('.chat-close').addEventListener('click', () => toggle(false));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    reply(value);
    input.value = '';
  });
  document.querySelectorAll('.chat-quick button').forEach(button => button.addEventListener('click', () => reply(button.textContent)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') toggle(false); });
})();
