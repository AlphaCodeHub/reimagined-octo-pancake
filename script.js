
        // Apply wallpaper if saved
        function applyWallpaper() {
            const wallpaper = localStorage.getItem('wallpaper');
            if (wallpaper) {
                document.body.style.backgroundImage = `url(${wallpaper})`;
            } else {
                document.body.style.backgroundImage = 'none';
                document.body.style.backgroundColor = '#F6F4F1';
            }
        }
        
        // Apply wallpaper on load
        applyWallpaper();
        
        const searchForm = document.getElementById('search-form');
        const searchEngines = document.querySelectorAll('.search-engine');
        
        searchEngines.forEach(engine => {
            engine.addEventListener('click', () => {
                // Remove active class from all engines
                searchEngines.forEach(e => e.classList.remove('active'));
                
                // Add active class to clicked engine
                engine.classList.add('active');
                
                // Update the form action
                searchForm.action = engine.getAttribute('data-url');
            });
        });

        function updateClock() {
    const now = new Date();

    // Format time in Pakistan Standard Time (Asia/Karachi)
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: true,
        timeZone: 'Asia/Karachi' 
    });

    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        timeZone: 'Asia/Karachi'
    });

    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Update clock every second
updateClock();
setInterval(updateClock, 1000);


        // Todo List functionality
        const todoInput = document.getElementById('todo-input');
        const todoAddBtn = document.getElementById('todo-add');
        const todoList = document.getElementById('todo-list');
        
        // Load todos from localStorage
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        
        // Render todos
        function renderTodos() {
            todoList.innerHTML = '';
            
            todos.forEach((todo, index) => {
                const todoItem = document.createElement('div');
                todoItem.classList.add('todo-item');
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.completed;
                checkbox.addEventListener('change', () => {
                    toggleTodo(index);
                });
                
                const todoText = document.createElement('span');
                todoText.classList.add('todo-text');
                todoText.textContent = todo.text;
                if (todo.completed) {
                    todoText.style.textDecoration = 'line-through';
                }
                
                const deleteBtn = document.createElement('span');
                deleteBtn.classList.add('todo-delete');
                deleteBtn.textContent = 'X';
                deleteBtn.addEventListener('click', () => {
                    deleteTodo(index);
                });
                
                todoItem.appendChild(checkbox);
                todoItem.appendChild(todoText);
                todoItem.appendChild(deleteBtn);
                
                todoList.appendChild(todoItem);
            });
            
            // Save to localStorage
            localStorage.setItem('todos', JSON.stringify(todos));
        }
        
        // Add todo
        function addTodo() {
            const text = todoInput.value.trim();
            if (text) {
                todos.push({
                    text,
                    completed: false
                });
                todoInput.value = '';
                renderTodos();
            }
        }
        
        // Toggle todo completion
        function toggleTodo(index) {
            todos[index].completed = !todos[index].completed;
            renderTodos();
        }
        
        // Delete todo
        function deleteTodo(index) {
            todos.splice(index, 1);
            renderTodos();
        }
        
        // Event listeners
        todoAddBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTodo();
            }
        });
        
        // Initial render
        renderTodos();

        // Shortcuts functionality
        const shortcutsContainer = document.getElementById('shortcuts');
        const shortcutModal = document.getElementById('shortcut-modal');
        const cancelShortcutBtn = document.getElementById('cancel-shortcut');
        const saveShortcutBtn = document.getElementById('save-shortcut');
        const shortcutNameInput = document.getElementById('shortcut-name');
        const shortcutUrlInput = document.getElementById('shortcut-url');
        const shortcutIconInput = document.getElementById('shortcut-icon');
        
        // Default shortcuts with SVG icons
        const defaultShortcuts = [
            { 
                name: 'YouTube', 
                url: 'https://www.youtube.com', 
                icon: '<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' 
            },
            { 
                name: 'X', 
                url: 'https://www.twitter.com', 
                icon: '<svg viewBox="0 0 24 24"><path fill="#000000" d="M13.319 10.172l8.507-9.893h-2.014l-7.389 8.582-5.908-8.582H0l8.942 12.986L0 24h2.014l7.851-9.123 6.248 9.123H24l-9.371-13.828zm-2.787 3.243l-.911-1.303L2.712 1.873h3.12l5.571 7.972.911 1.303 7.13 10.202h-3.119l-5.793-8.293z"/></svg>' 
            },
            { 
                name: 'GitHub', 
                url: 'https://www.github.com', 
                icon: '<svg viewBox="0 0 24 24"><path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>' 
            },
            { 
                name: 'ChatGPT', 
                url: 'https://chat.openai.com', 
                icon: '<svg viewBox="0 0 24 24"><path fill="#10A37F" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5094-2.6067-1.4997z"/></svg>' 
            }
        ];
        
        // Load shortcuts from localStorage or use defaults
        let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || defaultShortcuts;
        
        // Render shortcuts
        function renderShortcuts() {
            shortcutsContainer.innerHTML = '';
            
            shortcuts.forEach((shortcut, index) => {
                const shortcutElement = document.createElement('a');
                shortcutElement.className = 'shortcut';
                shortcutElement.href = shortcut.url;
                shortcutElement.target = '_blank';
                
                const iconElement = document.createElement('div');
                iconElement.className = 'shortcut-icon';
                iconElement.innerHTML = shortcut.icon;
                
                const nameElement = document.createElement('div');
                nameElement.className = 'shortcut-name';
                nameElement.textContent = shortcut.name;
                
                const deleteElement = document.createElement('div');
                deleteElement.className = 'shortcut-delete';
                deleteElement.textContent = '×';
                deleteElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteShortcut(index);
                });
                
                shortcutElement.appendChild(iconElement);
                shortcutElement.appendChild(nameElement);
                shortcutElement.appendChild(deleteElement);
                
                shortcutsContainer.appendChild(shortcutElement);
            });
            
            // Add the "Add Shortcut" button
            const addButton = document.createElement('div');
            addButton.className = 'add-shortcut';
            addButton.textContent = '+';
            addButton.addEventListener('click', openShortcutModal);
            
            shortcutsContainer.appendChild(addButton);
            
            // Save to localStorage
            localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
        }
        
        // Open shortcut modal
        function openShortcutModal() {
            shortcutNameInput.value = '';
            shortcutUrlInput.value = 'https://';
            shortcutIconInput.value = '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.89 2.77-4.33 2.96-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>';
            shortcutModal.style.display = 'flex';
        }
        
        // Close shortcut modal
        function closeShortcutModal() {
            shortcutModal.style.display = 'none';
        }
        
        // Add new shortcut
        function addShortcut() {
            const name = shortcutNameInput.value.trim();
            let url = shortcutUrlInput.value.trim();
            const icon = shortcutIconInput.value.trim();
            
            if (name && url) {
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
                
                shortcuts.push({ name, url, icon });
                closeShortcutModal();
                renderShortcuts();
            }
        }
        
        // Delete shortcut
        function deleteShortcut(index) {
            shortcuts.splice(index, 1);
            renderShortcuts();
        }
        
        // Event listeners for shortcut modal
        cancelShortcutBtn.addEventListener('click', closeShortcutModal);
        saveShortcutBtn.addEventListener('click', addShortcut);
        
        // Initial render of shortcuts
        renderShortcuts();
        
        // Settings functionality
        const settingsButton = document.getElementById('settings-button');
        const settingsModal = document.getElementById('settings-modal');
        const cancelSettingsBtn = document.getElementById('cancel-settings');
        const saveSettingsBtn = document.getElementById('save-settings');
        const resetWallpaperBtn = document.getElementById('reset-wallpaper');
        const wallpaperUpload = document.getElementById('wallpaper-upload');
        const wallpaperPreview = document.getElementById('wallpaper-preview');
        
        let newWallpaper = null;
        
        // Open settings modal
        settingsButton.addEventListener('click', () => {
            settingsModal.style.display = 'flex';
            
            // Show current wallpaper in preview if exists
            const currentWallpaper = localStorage.getItem('wallpaper');
            if (currentWallpaper) {
                wallpaperPreview.style.backgroundImage = `url(${currentWallpaper})`;
                wallpaperPreview.style.display = 'block';
            } else {
                wallpaperPreview.style.display = 'none';
            }
        });
        
        // Close settings modal
        cancelSettingsBtn.addEventListener('click', () => {
            settingsModal.style.display = 'none';
            newWallpaper = null;
        });
        
        // Handle wallpaper upload
        wallpaperUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    newWallpaper = e.target.result;
                    wallpaperPreview.style.backgroundImage = `url(${newWallpaper})`;
                    wallpaperPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Save settings
        saveSettingsBtn.addEventListener('click', () => {
            if (newWallpaper) {
                localStorage.setItem('wallpaper', newWallpaper);
                applyWallpaper();
            }
            settingsModal.style.display = 'none';
        });
        
        // Reset wallpaper
        resetWallpaperBtn.addEventListener('click', () => {
            localStorage.removeItem('wallpaper');
            wallpaperPreview.style.display = 'none';
            newWallpaper = null;
            applyWallpaper();
        });
    
        

   
 
 function getSpecialMessage() {
    const now = new Date();
    const month = now.getMonth();  // 0 = Jan, 1 = Feb, ..., 5 = June, ...
    const day = now.getDate();
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });

    // Define special events by date (month is 0-based)
    const events = [
  { month: 0, day: 1, message: "🎉 Happy New Year's Day! Start the year with energy!" },
  { month: 1, day: 14, message: "❤️ Valentine's Day! Spread love and kindness!" },
  { month: 2, day: 17, message: "☘️ St. Patrick's Day! Wear green and celebrate!" },
  { month: 3, day: 1, message: "🌸 April Fools! Have fun and stay playful!" },
  { month: 3, day: 22, message: "🌍 Earth Day! Care for our planet!" },
  { month: 4, day: 1, message: "🌸 Happy May Day! Take a moment to relax!" },
  { month: 4, day: 5, message: "🌸 Mother's Day! Celebrate mom's love!" }, 
  { month: 5, day: 14, message: "🌞 Happy June! Summer vibes on!" },
  { month: 6, day: 4, message: "🎆 Independence Day Eve! Get ready to celebrate!" },
  { month: 6, day: 14, message: "🇺🇸 Happy Independence Day! Freedom and pride!" },
  { month: 7, day: 14, message: "🇵🇰 Happy Independence Day! Explore your freedom!" },
  { month: 8, day: 1, message: "🌅 Welcome September! New beginnings!" },
  { month: 8, day: 15, message: "🌾 Harvest season is here! Enjoy nature's bounty!" },
  { month: 9, day: 31, message: "🎃 Halloween is coming! Get spooky!" },
  { month: 10, day: 11, message: "🦃 Thanksgiving Day! Be thankful and share!" },
  { month: 11, day: 25, message: "🎄 Merry Christmas! Enjoy the festive spirit!" },
  { month: 11, day: 31, message: "🎉 New Year's Eve! Time to celebrate!" },
  
  { month: 4, day: 6, message: "🐑💫 Eid al-Fitr Mubarak! Joy and blessings to you!" },
  { month: 5, day: 6, message: "🐑💫 Eid al-Adha Mubarak! Celebrate with love and gratitude!" },
  { month: 2, day: 8, message: "🕉️ Holi Festival! Colors and happiness everywhere!" }
];
    // Check if today matches any special event
    for (const event of events) {
      if (month === event.month && day === event.day) {
        return event.message;
      }
    }

    // Special day-based messages (like Sunday)
    if (weekday === "Sunday") {
      return "☀️ Happy Sunday! Explore something cool!";
    }

    // Default message
    return "WHAT DO YOU WANT TO EXPLORE?";
  }

  // Set the message to the div
  document.getElementById('search-prompt').textContent = getSpecialMessage();