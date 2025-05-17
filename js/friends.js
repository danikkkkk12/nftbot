
            const copyButton = document.getElementById('copyLinkBtn');
            const notification = document.getElementById('copyNotification');
            let notificationTimeout;

            copyButton.addEventListener('click', function() {
                const linkToCopy = window.location.href; 

                navigator.clipboard.writeText(linkToCopy).then(function() {
                    notification.classList.add('show');
                    if (notificationTimeout) {
                        clearTimeout(notificationTimeout);
                    }

                    notificationTimeout = setTimeout(function() {
                        notification.classList.remove('show');
                    }, 2000); 

                }).catch(function(err) {
                    console.error('Failed to copy: ', err);
                    alert('Не удалось скопировать ссылку. Попробуйте вручную.');
                });
            });