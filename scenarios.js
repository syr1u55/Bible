const SCENARIOS = [
  {
    id: "forgiveness",
    theme: "Forgiveness",
    icon: "🕊️",
    book: "Matthew 18:21–35",
    bookTitle: "The Parable of the Unforgiving Servant",
    color: "#7c6cd4",
    modern_story: "A coworker you trusted takes full credit for a project you both worked on — right in front of your manager during a big meeting. You feel a rush of betrayal. Everyone is applauding them. What do you do?",
    choices: [
      { id: "A", text: "Pull your manager aside after and explain your contribution calmly.", alignment: "positive" },
      { id: "B", text: "Post something passive-aggressive on social media without naming them.", alignment: "negative" },
      { id: "C", text: "Go directly to the coworker privately and address it honestly.", alignment: "wisdom" },
      { id: "D", text: "Silently fume and start planning how to get back at them.", alignment: "negative" }
    ],
    revelations: {
      A: { verse: "Matthew 18:15", text: "\"If your brother or sister sins, go and point it out to them privately.\"", lesson: "Going to leadership is sometimes necessary — but Jesus' first instruction was always to try resolving it personally. You're on the right track, but the private conversation should come first.", alignment: "positive" },
      B: { verse: "Proverbs 17:9", text: "\"Whoever would foster love covers over an offense, but whoever repeats the matter separates close friends.\"", lesson: "Public shaming — even when veiled — spreads bitterness, not resolution. The Bible consistently calls us away from broadcasting grievances and toward direct, loving confrontation.", alignment: "negative" },
      C: { verse: "Matthew 18:15", text: "\"If your brother or sister sins, go and point it out to them privately; if they listen to you, you have won them over.\"", lesson: "This is exactly the pattern Jesus laid out. Going to them privately is both bold and gracious — it gives them a chance to make it right without humiliating them.", alignment: "wisdom" },
      D: { verse: "Romans 12:19", text: "\"Do not take revenge, my dear friends, but leave room for God's wrath.\"", lesson: "Revenge feels satisfying to plan, but the Bible tells us that God is the one who settles accounts — not us. Nursing a grudge only poisons the one who holds it.", alignment: "negative" }
    },
    reflection_prompt: "Is there someone in your life right now that you are finding it difficult to forgive? What is one small step you could take toward that conversation?",
    gem: "The Forgiveness Gem"
  },
  {
    id: "generosity",
    theme: "Generosity",
    icon: "🪙",
    book: "Luke 21:1–4",
    bookTitle: "The Widow's Offering",
    color: "#c9a84c",
    modern_story: "You just got paid. After rent, bills, and groceries, you have £80 left. On your way home, you pass a homeless man shivering outside a shop. You also know your church's youth program needs donations to keep the lights on this month. What do you do?",
    choices: [
      { id: "A", text: "Give £5 to the man and promise yourself you'll donate to the church when you're in a better position.", alignment: "neutral" },
      { id: "B", text: "Walk past both — you genuinely can't afford to give right now.", alignment: "neutral" },
      { id: "C", text: "Stop, buy the man a hot meal, then give what you can to the church even if it hurts.", alignment: "wisdom" },
      { id: "D", text: "Give £50 to the church online later — organized giving is more effective.", alignment: "positive" }
    ],
    revelations: {
      A: { verse: "Proverbs 3:27", text: "\"Do not withhold good from those to whom it is due, when it is in your power to act.\"", lesson: "The intention is good, but 'later' is a common trap. Scripture urges us to act in the moment of need when we have the means, not just when it's convenient.", alignment: "neutral" },
      B: { verse: "1 John 3:17", text: "\"If anyone has material possessions and sees a brother or sister in need but has no pity on them, how can the love of God be in that person?\"", lesson: "This is a hard verse. The Bible doesn't excuse us from generosity based on our own financial anxiety. It calls us to act on what we see.", alignment: "neutral" },
      C: { verse: "Luke 21:3–4", text: "\"This poor widow has put in more than all the others. All these people gave their gifts out of their wealth; but she out of her poverty put in all she had to live on.\"", lesson: "The Widow's Offering teaches that God measures generosity not by the amount, but by the sacrifice. Giving when it hurts is the heart of this parable.", alignment: "wisdom" },
      D: { verse: "Luke 10:33", text: "\"But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him.\"", lesson: "Structured giving is valuable. But the Good Samaritan didn't schedule compassion — he responded to the person right in front of him. Don't let systems replace presence.", alignment: "positive" }
    },
    reflection_prompt: "When you walk past someone in need, what goes through your mind? What would it look like to be more like the Good Samaritan in your daily commute?",
    gem: "The Generosity Gem"
  },
  {
    id: "pride",
    theme: "Pride",
    icon: "👑",
    book: "Proverbs 16:18",
    bookTitle: "Pride Goes Before Destruction",
    color: "#e05c5c",
    modern_story: "You've been running a business for 3 years and it's finally doing well. An old friend — who is struggling financially — asks for your advice on starting their own. As you sit down with them, you realize their idea is almost identical to your early model. Do you share everything openly, or protect your advantage?",
    choices: [
      { id: "A", text: "Share the basics but keep your real strategy to yourself — this is business.", alignment: "negative" },
      { id: "B", text: "Share everything openly and offer to mentor them.", alignment: "wisdom" },
      { id: "C", text: "Tell them the idea won't work and subtly discourage them, then feel guilty later.", alignment: "negative" },
      { id: "D", text: "Share genuinely but charge a consulting fee — fair is fair.", alignment: "neutral" }
    ],
    revelations: {
      A: { verse: "Proverbs 11:24", text: "\"One person gives freely, yet gains even more; another withholds unduly, but comes to poverty.\"", lesson: "Hoarding wisdom for competitive advantage is rooted in the belief that your success is threatened by another's. But scripture teaches the opposite — generosity of knowledge often returns multiplied.", alignment: "negative" },
      B: { verse: "Philippians 2:3", text: "\"Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.\"", lesson: "This is the posture of Christ — giving freely from your abundance (even of knowledge) to lift someone else. This is the antidote to pride.", alignment: "wisdom" },
      C: { verse: "Proverbs 16:18", text: "\"Pride goes before destruction, a haughty spirit before a fall.\"", lesson: "Discouraging someone to protect your own sense of superiority is the classic shape of pride leading to destruction — yours and theirs.", alignment: "negative" },
      D: { verse: "Luke 6:35", text: "\"Love your enemies, do good to them, and lend to them without expecting to get anything back.\"", lesson: "A fee isn't wrong — but the motivation matters. Is it about fair exchange, or is it creating a barrier to keep them a step behind you?", alignment: "neutral" }
    },
    reflection_prompt: "In what areas of your life do you subtly compete with the people closest to you? What would genuine celebration of their success look like?",
    gem: "The Humility Gem"
  },
  {
    id: "fear",
    theme: "Fear",
    icon: "🌊",
    book: "Matthew 14:22–33",
    bookTitle: "Jesus Walks on Water",
    color: "#3a9bd5",
    modern_story: "You've been offered your dream job. But it means leaving everything familiar — your city, your friends, your rhythm of life. You've prayed about it for weeks and it genuinely seems like the right door. But the night before you must respond, fear floods in. What do you do?",
    choices: [
      { id: "A", text: "Turn it down. The risk is too great and the timing isn't right.", alignment: "negative" },
      { id: "B", text: "Say yes, pack your bags, and refuse to look back.", alignment: "positive" },
      { id: "C", text: "Ask for more time and spend another month analysing it.", alignment: "neutral" },
      { id: "D", text: "Say yes, but honestly acknowledge the fear and walk forward anyway.", alignment: "wisdom" }
    ],
    revelations: {
      A: { verse: "2 Timothy 1:7", text: "\"For God has not given us a spirit of fear, but of power and of love and of a sound mind.\"", lesson: "Fear dressed up as wisdom can still be just fear. If the door seems right after prayer, declining out of fear is not prudence — it may be the voice you are not supposed to listen to.", alignment: "negative" },
      B: { verse: "Matthew 14:29", text: "\"Come,\" Jesus said. Then Peter got down out of the boat, walked on water, and came toward Jesus.\"", lesson: "Bold obedience is a beautiful response to a clear calling. Peter didn't walk on water because he had no fear — he walked because he kept his eyes on Jesus.", alignment: "positive" },
      C: { verse: "Ecclesiastes 11:4", text: "\"Whoever watches the wind will not plant; whoever looks at the clouds will not reap.\"", lesson: "Over-analysis is often fear operating in disguise. At some point, waiting becomes an answer by default — a no dressed in a maybe.", alignment: "neutral" },
      D: { verse: "Isaiah 41:10", text: "\"Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.\"", lesson: "This is the most honest and courageous option. Saying yes while acknowledging the fear is not weakness — it's faith. Peter stepped out of the boat feeling the wind.", alignment: "wisdom" }
    },
    reflection_prompt: "What is one thing in your life right now that you know you should do, but fear has been holding you back from? What would 'stepping out of the boat' look like this week?",
    gem: "The Courage Gem"
  },
  {
    id: "jealousy",
    theme: "Jealousy",
    icon: "🔥",
    book: "Genesis 37",
    bookTitle: "Joseph and His Brothers",
    color: "#e07a5f",
    modern_story: "Your younger sibling just got promoted to a position you've been quietly working toward for two years. Your parents are thrilled and can't stop talking about it at dinner. You're happy for them… but something dark stirs inside you. What do you do with it?",
    choices: [
      { id: "A", text: "Smile through it, then go home and cry. Repeat indefinitely.", alignment: "neutral" },
      { id: "B", text: "Start quietly pointing out their flaws to your parents to level the playing field.", alignment: "negative" },
      { id: "C", text: "Honestly admit to a trusted friend that you're struggling with jealousy.", alignment: "wisdom" },
      { id: "D", text: "Channel all of it into working harder — use the envy as fuel.", alignment: "neutral" }
    ],
    revelations: {
      A: { verse: "Psalm 32:3", text: "\"When I kept silent, my bones wasted away through my groaning all day long.\"", lesson: "Suppressed emotions don't disappear — they fester. Smiling on the outside while suffering inside is a slow poison. God wants honesty, even about the ugly feelings.", alignment: "neutral" },
      B: { verse: "Genesis 37:4", text: "\"When his brothers saw that their father loved him more than any of them, they hated him and could not speak a kind word to him.\"", lesson: "Joseph's brothers let jealousy turn to hatred and then to action. Subtly undermining someone to prop yourself up is the first step on a very destructive road.", alignment: "negative" },
      C: { verse: "James 5:16", text: "\"Therefore confess your sins to each other and pray for each other so that you may be healed.\"", lesson: "Naming jealousy out loud to a trusted person is one of the most powerful things you can do. It loses its power when it's brought into the light.", alignment: "wisdom" },
      D: { verse: "Galatians 5:26", text: "\"Let us not become conceited, provoking and envying each other.\"", lesson: "Competitive drive can be healthy, but when it's secretly rooted in envy of a specific person, it tends to corrupt both the motivation and the relationship.", alignment: "neutral" }
    },
    reflection_prompt: "Who in your life are you quietly comparing yourself to? What would it feel like to genuinely celebrate their success without any hidden resentment?",
    gem: "The Contentment Gem"
  },
  {
    id: "honesty",
    theme: "Honesty",
    icon: "⚖️",
    book: "Proverbs 12:17–22",
    bookTitle: "The Words of the Honest",
    color: "#5cb8b2",
    modern_story: "You're filling out a job application for a role you really want. The form asks whether you have a specific qualification you're only halfway through obtaining. You could word it ambiguously and no one would likely notice. The job could genuinely change your life. What do you do?",
    choices: [
      { id: "A", text: "Write it in a way that implies you have it — the spirit of it is true enough.", alignment: "negative" },
      { id: "B", text: "State clearly that you are currently in the process of obtaining it.", alignment: "wisdom" },
      { id: "C", text: "Leave the question blank and hope they don't ask.", alignment: "neutral" },
      { id: "D", text: "Don't apply — you're not qualified yet and it's not time.", alignment: "neutral" }
    ],
    revelations: {
      A: { verse: "Proverbs 12:22", text: "\"The Lord detests lying lips, but he delights in people who are trustworthy.\"", lesson: "A half-truth is still a deception. It builds your future on a shaky foundation. Character is what we do when no one is checking the details.", alignment: "negative" },
      B: { verse: "Proverbs 12:17", text: "\"An honest witness tells the truth, but a false witness tells lies.\"", lesson: "Real confidence says: 'Here's where I am, and here's where I'm going.' Honesty about your current status, paired with belief in your potential, is more compelling than a fabricated credential.", alignment: "wisdom" },
      C: { verse: "Luke 16:10", text: "\"Whoever can be trusted with very little can also be trusted with much.\"", lesson: "Leaving it blank is a form of evasion. Integrity in the small details is what qualifies us for the bigger things — in God's economy and in the world's.", alignment: "neutral" },
      D: { verse: "Ecclesiastes 9:11", text: "\"The race is not to the swift or the battle to the strong.\"", lesson: "Timing and preparation matter, but over-caution can also be a form of fear. Being in progress doesn't disqualify you — it's often the honest path forward.", alignment: "neutral" }
    },
    reflection_prompt: "Where in your life are you tempted to present a slightly inflated version of yourself? What would radical honesty cost you — and what might it give you?",
    gem: "The Integrity Gem"
  },
  {
    id: "love",
    theme: "Love",
    icon: "❤️",
    book: "1 Corinthians 13",
    bookTitle: "The Love Chapter",
    color: "#d4596a",
    modern_story: "Your best friend is in a relationship that you believe is genuinely harmful to them. You've watched them change — withdraw, make excuses, lose confidence. They haven't asked for your opinion. In fact, they seem defensive whenever you're around their partner. What do you do?",
    choices: [
      { id: "A", text: "Say nothing. It's their life and they haven't asked.", alignment: "neutral" },
      { id: "B", text: "Tell all your mutual friends your concerns — someone has to see it.", alignment: "negative" },
      { id: "C", text: "Plan a one-on-one moment and gently, honestly tell them what you've observed. Then listen.", alignment: "wisdom" },
      { id: "D", text: "Create distance — you can't watch this and don't want to enable it.", alignment: "neutral" }
    ],
    revelations: {
      A: { verse: "1 Corinthians 13:4–5", text: "\"Love is patient, love is kind. It does not envy, it does not boast, it is not proud... it is not self-seeking.\"", lesson: "Love is not passive. It is patient and kind, but it is also courageous. Real love sometimes requires saying what is hard to say because you care more about their wellbeing than your comfort.", alignment: "neutral" },
      B: { verse: "Proverbs 17:9", text: "\"Whoever would foster love covers over an offense, but whoever repeats the matter separates close friends.\"", lesson: "Spreading your concerns to others first fractures the friendship group and puts your friend on trial without their knowledge. This plants seeds of division, not restoration.", alignment: "negative" },
      C: { verse: "Ephesians 4:15", text: "\"Instead, speaking the truth in love, we will grow to become in every respect the mature body of him who is the head, that is, Christ.\"", lesson: "Truth in love — not truth as a weapon, and not silence as love. The combination of honesty and gentleness, delivered directly, is the most biblical form of friendship.", alignment: "wisdom" },
      D: { verse: "Galatians 6:2", text: "\"Carry each other's burdens, and in this way you will fulfill the law of Christ.\"", lesson: "Stepping back to protect your own peace is understandable but not the full picture. Scripture calls us to stay in — to be burden-bearers, not bystanders.", alignment: "neutral" }
    },
    reflection_prompt: "Is there someone close to you right now who you sense is struggling but hasn't asked for help? What is one caring, non-intrusive step you could take this week?",
    gem: "The Love Gem"
  },
  {
    id: "humility",
    theme: "Humility",
    icon: "🙏",
    book: "Luke 14:7–11",
    bookTitle: "The Parable of the Wedding Feast",
    color: "#8a7fcf",
    modern_story: "You walk into a meeting where you're easily the most experienced person in the room. The facilitator, who is much younger than you, starts presenting a strategy that you know has serious flaws. What do you do?",
    choices: [
      { id: "A", text: "Interrupt immediately and correct them — the team needs accurate information.", alignment: "negative" },
      { id: "B", text: "Say nothing. Let them learn from the consequences.", alignment: "neutral" },
      { id: "C", text: "Raise your hand at the appropriate moment and ask a thoughtful question that highlights the gap.", alignment: "wisdom" },
      { id: "D", text: "Wait until after, pull them aside privately, and offer your experience as a resource.", alignment: "wisdom" }
    ],
    revelations: {
      A: { verse: "Proverbs 18:2", text: "\"Fools find no pleasure in understanding but delight in airing their own opinions.\"", lesson: "Experience is a gift, but humility is its packaging. Interrupting to correct someone — especially publicly — is often more about asserting your authority than genuinely helping.", alignment: "negative" },
      B: { verse: "Proverbs 24:12", text: "\"If you say, 'But we knew nothing about this,' does not he who weighs the heart perceive it?\"", lesson: "Silence out of detachment is not humility — it's abdication. Humility speaks up when it has something to offer; it just chooses its moment carefully.", alignment: "neutral" },
      C: { verse: "Luke 14:10", text: "\"But when you are invited, take the lowest place, so that when your host comes, he will say to you, 'Friend, move up to a better place.'\"", lesson: "A well-placed question respects the room and the facilitator while opening space for truth. This is the humility of the wedding guest who waits to be called forward.", alignment: "wisdom" },
      D: { verse: "Luke 14:11", text: "\"For all those who exalt themselves will be humbled, and those who humble themselves will be exalted.\"", lesson: "Taking the private route is the most generous form of correction. It protects their dignity, builds trust, and positions you as a mentor rather than a critic.", alignment: "wisdom" }
    },
    reflection_prompt: "Think of the last time you were the smartest or most experienced person in a room. How did you carry that? Was your knowledge used as a platform or as a gift?",
    gem: "The Servant-Heart Gem"
  },
  {
    id: "greed",
    theme: "Greed",
    icon: "💰",
    book: "Luke 12:13–21",
    bookTitle: "The Parable of the Rich Fool",
    color: "#7ab648",
    modern_story: "You receive an unexpected windfall — £15,000 inheritance from a relative you barely knew. At the same time, you're aware of a genuine community need (a local food bank about to close). You also have personal financial goals you've been working toward. What do you do?",
    choices: [
      { id: "A", text: "Invest all of it wisely — future security is responsible stewardship.", alignment: "neutral" },
      { id: "B", text: "Keep £14,000 and donate £1,000 — symbolic but safe.", alignment: "neutral" },
      { id: "C", text: "Prayerfully discern the portion God is asking for — then actually give it, even if it's uncomfortable.", alignment: "wisdom" },
      { id: "D", text: "Give it all to the food bank — radical generosity is the call.", alignment: "positive" }
    ],
    revelations: {
      A: { verse: "Luke 12:20", text: "\"God said to him, 'You fool! This very night your life will be demanded from you. Then who will get what you have prepared for yourself?'\"", lesson: "Security is not wrong — but when our plans focus entirely on accumulation with no divine consultation, we quietly become the man who built bigger barns. God is not opposed to savings; He is opposed to a life organised around them.", alignment: "neutral" },
      B: { verse: "2 Corinthians 9:7", text: "\"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.\"", lesson: "Giving to feel better about keeping more is not the spirit described here. God is after the heart, not the percentage.", alignment: "neutral" },
      C: { verse: "Luke 12:21", text: "\"This is how it will be with whoever stores up things for themselves but is not rich toward God.\"", lesson: "Being rich toward God means actively listening about how to steward what He has given. This choice requires courage — but it is the heart of biblical generosity.", alignment: "wisdom" },
      D: { verse: "Mark 12:43–44", text: "\"She out of her poverty, put in everything — all she had to live on.\"", lesson: "If this is genuinely Spirit-led, it is the most powerful act. But the Bible also commends wise planning. The key question is: what is God actually asking, not just what sounds the most dramatic?", alignment: "positive" }
    },
    reflection_prompt: "If you received an unexpected gift of money today, what would your very first instinct be? What does that instinct reveal about where your security is rooted?",
    gem: "The Stewardship Gem"
  },
  {
    id: "justice",
    theme: "Justice",
    icon: "🌿",
    book: "Micah 6:8",
    bookTitle: "What Does the Lord Require?",
    color: "#43aa8b",
    modern_story: "You discover that a supplier your company uses has been found to use exploitative labour practices in another country. Your manager says it's outside your department and not your problem. You know if you raise it formally, it might cost the company a convenient deal and make you unpopular. What do you do?",
    choices: [
      { id: "A", text: "It's above your pay grade — stay in your lane and focus on your work.", alignment: "negative" },
      { id: "B", text: "Write an anonymous tip to a journalist or external watchdog.", alignment: "neutral" },
      { id: "C", text: "Bring it formally to the ethics team or leadership in writing, accepting the consequences.", alignment: "wisdom" },
      { id: "D", text: "Raise it in conversation with colleagues quietly to test the temperature first.", alignment: "neutral" }
    ],
    revelations: {
      A: { verse: "Proverbs 31:8–9", text: "\"Speak up for those who cannot speak for themselves... defend the rights of the poor and needy.\"", lesson: "The call to justice in scripture is not limited to religious leaders or activists. Every person who sees injustice has a responsibility. 'Not my department' was never a biblical excuse.", alignment: "negative" },
      B: { verse: "Matthew 18:15", text: "\"If your brother or sister sins against you, go and point it out to them privately first.\"", lesson: "External escalation before internal honesty is not the biblical pattern. Going public first bypasses the opportunity for the institution to self-correct — which is the preferred path.", alignment: "neutral" },
      C: { verse: "Micah 6:8", text: "\"He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.\"", lesson: "This is the full expression of Micah 6:8 in practice — acting justly (raising the issue), walking humbly (accepting the cost), and loving mercy (doing it in a spirit of reform, not revenge).", alignment: "wisdom" },
      D: { verse: "James 4:17", text: "\"If anyone, then, knows the good they ought to do and doesn't do it, it is sin for them.\"", lesson: "Testing the temperature is not wrong, but if it becomes a way to avoid action until there is social safety, James has a word for it. Knowing what's right and waiting for permission is still inaction.", alignment: "neutral" }
    },
    reflection_prompt: "Where in your daily life — at work, in your community, online — do you regularly see something unjust and look away? What would one act of justice look like this week?",
    gem: "The Justice Gem"
  }
];
