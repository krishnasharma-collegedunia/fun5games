/*
 * GAME CONTENT GENERATOR
 * ======================
 * Generates editorial-style content sections for game detail pages.
 * Content is derived from game metadata (category, tags, title, developer, etc.)
 * to produce unique, substantial text per game.
 */

const categoryGameplay = {
  Action: {
    mechanics: 'fast reflexes, precision combat, and split-second decision-making',
    style: 'action-packed gameplay with intense combat sequences',
    audience: 'players who thrive on adrenaline-pumping challenges',
  },
  Puzzle: {
    mechanics: 'logical thinking, pattern recognition, and creative problem-solving',
    style: 'brain-teasing challenges that get progressively harder',
    audience: 'players who enjoy mental challenges and satisfying solutions',
  },
  Racing: {
    mechanics: 'precise steering, strategic boosting, and track memorization',
    style: 'high-speed competition with tight controls',
    audience: 'speed enthusiasts and competitive racers',
  },
  Sports: {
    mechanics: 'timing-based controls, team management, and competitive play',
    style: 'authentic sports simulation with intuitive controls',
    audience: 'sports fans looking for realistic mobile experiences',
  },
  Arcade: {
    mechanics: 'quick reflexes, score chasing, and simple-to-learn controls',
    style: 'pick-up-and-play fun with endless replayability',
    audience: 'casual and competitive players looking for quick sessions',
  },
  Casual: {
    mechanics: 'easy-to-learn controls, relaxing pace, and satisfying progression',
    style: 'laid-back gameplay perfect for short breaks',
    audience: 'everyone from kids to adults looking for stress-free fun',
  },
  Strategy: {
    mechanics: 'resource management, tactical planning, and long-term thinking',
    style: 'deep strategic gameplay that rewards careful planning',
    audience: 'thinkers and planners who enjoy outsmarting opponents',
  },
  Adventure: {
    mechanics: 'exploration, story progression, and discovery',
    style: 'immersive worlds with rich narratives and discoveries',
    audience: 'players who love exploring new worlds and stories',
  },
};

const tagTips = {
  'battle-royale': [
    'Land in less crowded areas when starting out to gear up safely before engaging enemies.',
    'Always keep moving — staying still makes you an easy target for snipers.',
    'Pay attention to the shrinking zone and plan your rotations early.',
    'Use headphones to hear footsteps and gunfire direction for a tactical advantage.',
  ],
  shooter: [
    'Practice your aim in training modes before jumping into competitive matches.',
    'Learn to use cover effectively — never stand in the open during firefights.',
    'Switch between weapons based on the engagement range.',
    'Communicate with your team about enemy positions and coordinate pushes.',
  ],
  runner: [
    'Stay in the center of the path to give yourself more reaction time.',
    'Collect power-ups early in your run for a strong start.',
    'Memorize recurring obstacle patterns to improve your reaction time.',
    'Use special abilities right before difficult sections to maintain your streak.',
  ],
  'match3': [
    'Start matching from the bottom of the board to create cascading chain reactions.',
    'Focus on creating special candy combinations for powerful board-clearing effects.',
    'Save your boosters for levels you find particularly challenging.',
    'Look for L-shaped and T-shaped matches to create wrapped candies.',
  ],
  sandbox: [
    'Start with a small shelter before building anything ambitious to stay safe at night.',
    'Gather resources systematically and organize your inventory early on.',
    'Explore gradually, marking your path so you can always find your way back.',
    'Join community servers to learn building techniques from experienced players.',
  ],
  multiplayer: [
    'Play a few solo rounds first to understand the basic mechanics.',
    'Communicate clearly with teammates — callouts make a huge difference.',
    'Watch replays of your matches to identify mistakes and improve.',
    'Add skilled players as friends so you have reliable teammates for future sessions.',
  ],
  horror: [
    'Play with headphones for the full immersive experience.',
    'Manage your resources carefully — you never know when you will need them most.',
    'Pay attention to environmental sounds and visual cues for upcoming scares.',
    'Learn enemy patrol patterns to time your movements effectively.',
  ],
  physics: [
    'Experiment with different angles and power levels to find the optimal solution.',
    'Watch how objects interact after your first attempt to plan your next move.',
    'Sometimes the simplest approach works better than complex strategies.',
    'Replay completed levels to try for better scores with fewer moves.',
  ],
  'tower-defense': [
    'Place your strongest defenders along the longest path to maximize their effectiveness.',
    'Upgrade existing units before placing new ones in most situations.',
    'Mix unit types to cover different enemy weaknesses.',
    'Save special abilities for large enemy waves rather than using them on weak opponents.',
  ],
  cards: [
    'Learn the value of each card and plan moves several steps ahead.',
    'Focus on clearing columns first to create empty spaces for card placement.',
    'Use undo strategically rather than randomly to explore different paths.',
    'Practice recognizing card patterns to make faster decisions in timed modes.',
  ],
  simulation: [
    'Take your time learning the controls and interface before rushing into gameplay.',
    'Focus on one aspect of the simulation at a time to avoid feeling overwhelmed.',
    'Follow the in-game tutorial completely — it covers essential mechanics.',
    'Set small goals for each session to maintain a sense of progress.',
  ],
  rpg: [
    'Invest in one strong character build before spreading resources across many.',
    'Complete side quests early for extra experience and useful rewards.',
    'Save your game regularly, especially before major battles.',
    'Experiment with different equipment combinations to find synergies.',
  ],
  combat: [
    'Learn the timing of enemy attacks to master dodging and counter-attacking.',
    'Upgrade your defense alongside offense for balanced progression.',
    'Practice combo chains in training mode before using them in real fights.',
    'Study each opponent type to identify their weaknesses and attack patterns.',
  ],
  building: [
    'Plan your layout before building to avoid costly reorganization later.',
    'Protect your most valuable structures by placing them centrally.',
    'Balance offensive and defensive upgrades for well-rounded progress.',
    'Join an active clan or alliance for bonus resources and protection.',
  ],
  party: [
    'Learn the layout of each level before trying to speed through it.',
    'Watch other players to learn shortcuts and optimal paths.',
    'Use obstacles to your advantage by timing your jumps carefully.',
    'Stay calm during chaotic moments — panicking leads to mistakes.',
  ],
  social: [
    'Observe how experienced players handle their roles before trying advanced strategies.',
    'Communication and teamwork are more important than individual skill.',
    'Pay attention to behavioral patterns to identify who is playing which role.',
    'Play different roles each round to fully understand the game dynamics.',
  ],
  pets: [
    'Check on your pet regularly to keep happiness and health levels high.',
    'Complete daily tasks to earn coins and unlock new items faster.',
    'Explore all the mini-games to find which ones give the best rewards.',
    'Decorate your space to increase your overall score and unlock bonuses.',
  ],
  endless: [
    'Focus on survival rather than collecting items in your early runs.',
    'Learn the timing between obstacles to develop a consistent rhythm.',
    'Use special characters or power-ups strategically for high-score attempts.',
    'Take short breaks between sessions to maintain focus and reaction time.',
  ],
  music: [
    'Start on easier difficulty levels to learn the song patterns.',
    'Use headphones for better audio clarity and timing.',
    'Focus on accuracy rather than speed — perfect timing builds higher combos.',
    'Practice difficult sections by replaying the same song multiple times.',
  ],
  football: [
    'Master the passing controls before attempting advanced dribbling moves.',
    'Position your players strategically during set pieces for scoring opportunities.',
    'Study opponent formations to find gaps in their defense.',
    'Build a balanced squad rather than investing everything in one star player.',
  ],
  soccer: [
    'Time your shots carefully — power and angle matter more than speed.',
    'Use curved shots around the defensive wall during free kicks.',
    'Practice different formations to find one that matches your play style.',
    'Focus on midfield control to dominate possession throughout the match.',
  ],
};

function getHowToPlay(game) {
  const info = categoryGameplay[game.category] || categoryGameplay.Action;
  const hasAndroid = !!game.androidUrl;
  const hasIOS = !!game.iosUrl;

  let downloadStep = '';
  if (hasAndroid && hasIOS) {
    downloadStep = `Download ${game.title} for free from the Google Play Store (Android) or the Apple App Store (iOS).`;
  } else if (hasAndroid) {
    downloadStep = `Download ${game.title} from the Google Play Store on your Android device.`;
  } else if (hasIOS) {
    downloadStep = `Download ${game.title} from the Apple App Store on your iOS device.`;
  } else {
    downloadStep = `Search for ${game.title} on your device's app store to download and install it.`;
  }

  const steps = [
    {
      step: 'Download and Install',
      desc: `${downloadStep} The game requires a stable internet connection for the initial download. Make sure you have enough storage space on your device.`,
    },
    {
      step: 'Launch and Complete the Tutorial',
      desc: `Open ${game.title} and follow the in-game tutorial. The tutorial covers basic controls and core ${info.mechanics}. Pay close attention as these fundamentals are essential for progressing through harder levels.`,
    },
    {
      step: 'Understand the Core Gameplay',
      desc: `${game.title} features ${info.style}. The game is designed for ${info.audience}. Spend your first few sessions getting comfortable with the controls and understanding how different game elements interact with each other.`,
    },
    {
      step: 'Progress and Unlock Content',
      desc: `As you advance, you will unlock new levels, characters, and features. ${game.price === 'Free' ? 'The game is free to play with optional in-app purchases that can speed up progression, but everything can be earned through regular gameplay.' : 'Your purchase includes the full game experience with all core content available from the start.'}`,
    },
    {
      step: 'Join the Community',
      desc: `With ${game.downloads} downloads worldwide, ${game.title} has a massive active community. Connect with other players, share strategies, and stay updated with the latest events and updates from ${game.developer}.`,
    },
  ];

  return steps;
}

function getTips(game) {
  const tips = [];

  // Add tag-specific tips
  for (const tag of game.tags) {
    if (tagTips[tag]) {
      for (const tip of tagTips[tag]) {
        if (tips.length < 6 && !tips.includes(tip)) {
          tips.push(tip);
        }
      }
    }
  }

  // Generic fallback tips if not enough tag-specific ones
  const genericTips = [
    `Check ${game.developer}'s social media pages for event announcements and promo codes.`,
    `${game.price === 'Free' ? 'You can enjoy the full experience without spending money — be patient with progression.' : 'Explore all included content thoroughly before looking for extras.'}`,
    'Adjust your device settings for the best performance — close background apps and lower graphics if you experience lag.',
    'Enable notifications to never miss limited-time events and exclusive rewards.',
    `Play regularly to build muscle memory and improve your ${categoryGameplay[game.category]?.mechanics || 'gameplay skills'}.`,
    'Take breaks during long sessions to stay focused and avoid fatigue.',
  ];

  for (const tip of genericTips) {
    if (tips.length < 6) {
      tips.push(tip);
    }
  }

  return tips.slice(0, 6);
}

function getFeatures(game) {
  const features = [];
  const info = categoryGameplay[game.category] || categoryGameplay.Action;

  features.push({
    title: `Engaging ${game.category} Gameplay`,
    desc: `Experience ${info.style} with polished mechanics designed specifically for mobile devices. ${game.title} runs smoothly on both high-end and mid-range smartphones.`,
  });

  if (game.tags.includes('multiplayer') || game.tags.includes('battle-royale') || game.tags.includes('social')) {
    features.push({
      title: 'Online Multiplayer',
      desc: `Compete against real players from around the world. With ${game.downloads} downloads, you will always find opponents matched to your skill level.`,
    });
  }

  if (game.price === 'Free') {
    features.push({
      title: 'Free to Play',
      desc: 'Download and play at no cost. Optional in-app purchases are available but not required to enjoy the full game experience and progress through content.',
    });
  }

  features.push({
    title: 'Regular Updates',
    desc: `${game.developer} actively maintains ${game.title} with frequent updates that add new content, fix bugs, and introduce seasonal events to keep the gameplay fresh.`,
  });

  if (game.androidUrl && game.iosUrl) {
    features.push({
      title: 'Cross-Platform Availability',
      desc: `Available on both Android and iOS. Download from Google Play Store or Apple App Store and enjoy the same experience on your preferred mobile platform.`,
    });
  }

  features.push({
    title: `${game.age === 'Everyone' ? 'Family-Friendly' : game.age === 'Teen' ? 'Teen-Rated' : 'Mature'} Content`,
    desc: `Rated ${game.age} — ${game.age === 'Everyone' ? 'suitable for players of all ages with no objectionable content.' : game.age === 'Teen' ? 'designed for teen and adult players with moderate action themes.' : 'intended for mature audiences with intense gameplay themes.'}`,
  });

  return features;
}

function getFAQ(game) {
  const faqs = [];

  faqs.push({
    q: `Is ${game.title} free to download?`,
    a: game.price === 'Free'
      ? `Yes, ${game.title} is completely free to download and play. There are optional in-app purchases available, but you can enjoy the core gameplay without spending any money.`
      : `${game.title} costs ${game.price} to download. This is a one-time purchase that gives you access to the full game without mandatory additional purchases.`,
  });

  faqs.push({
    q: `What devices can I play ${game.title} on?`,
    a: `${game.title} is available for ${game.androidUrl && game.iosUrl ? 'both Android and iOS devices. You can download it from the Google Play Store or the Apple App Store' : game.androidUrl ? 'Android devices via the Google Play Store' : game.iosUrl ? 'iOS devices via the Apple App Store' : 'mobile devices through your app store'}. Check the store listing for minimum device requirements and compatible OS versions.`,
  });

  faqs.push({
    q: `Is ${game.title} safe for kids?`,
    a: `${game.title} is rated ${game.age}. ${game.age === 'Everyone' ? 'It is considered safe and appropriate for players of all ages.' : game.age === 'Teen' ? 'It is recommended for players aged 13 and above due to mild action or suggestive themes.' : 'It is intended for mature audiences aged 17+ and may contain intense violence or mature themes. Parental discretion is advised.'}`,
  });

  faqs.push({
    q: `Does ${game.title} require an internet connection?`,
    a: `An internet connection is required to download the game. ${game.tags.includes('multiplayer') || game.tags.includes('battle-royale') || game.tags.includes('social') ? 'Since this is a multiplayer game, you will need a stable internet connection to play online matches.' : 'Some features may work offline, but online connectivity is recommended for the best experience, updates, and cloud save functionality.'}`,
  });

  faqs.push({
    q: `Who developed ${game.title}?`,
    a: `${game.title} is developed by ${game.developer}. The game has been downloaded ${game.downloads} times and maintains a ${game.score || game.rating}-star rating on app stores, reflecting its quality and popularity among players worldwide.`,
  });

  return faqs;
}

export function getGameContent(game) {
  return {
    howToPlay: getHowToPlay(game),
    tips: getTips(game),
    features: getFeatures(game),
    faq: getFAQ(game),
  };
}
