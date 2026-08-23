document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. SAYFA GEÇİŞLERİ (LANDING <-> WORKSPACE)
    // ==========================================
    const landingPage = document.getElementById('landingPage');
    const editorWorkspace = document.getElementById('editorWorkspace');
    const btnStartNow = document.getElementById('btnStartNow');
    const templateSelect = document.getElementById('templateSelect');
    const cvCanvas = document.getElementById('cvCanvas');
    const btnBackToHome = document.getElementById('btnBackToHome');

    function showLandingPage() {
        editorWorkspace.classList.remove('active');
        landingPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showEditorWorkspace() {
        landingPage.classList.remove('active');
        editorWorkspace.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (btnStartNow) {
        btnStartNow.addEventListener('click', showEditorWorkspace);
    }

    if (btnBackToHome) {
        btnBackToHome.addEventListener('click', showLandingPage);
    }

    // Şablon Kartlarından Seçim
    document.querySelectorAll('.btn-select').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.template-card');
            const templateClass = card.getAttribute('data-template');

            templateSelect.value = templateClass;
            updateTemplate(templateClass);
            showEditorWorkspace();
        });
    });

    // ==========================================
    // 2. EDİTÖR ADIM YÖNETİMİ & DOĞRULAMA (VALIDATION)
    // ==========================================
    let currentStep = 1;
    const totalSteps = 8;
    const tabs = document.querySelectorAll('.step-tab');
    const contents = document.querySelectorAll('.step-content');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    const inputEmail = document.getElementById('inputEmail');
    const emailError = document.getElementById('emailError');

    function validateStep(step) {
        if (step === 1) {
            const emailVal = inputEmail.value.trim();
            // E-posta içinde @ ve en az bir nokta bulunması zorunlu
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailVal !== '' && !emailRegex.test(emailVal)) {
                if (emailError) emailError.style.display = 'block';
                inputEmail.style.borderColor = '#ef4444';
                inputEmail.focus();
                return false;
            } else {
                if (emailError) emailError.style.display = 'none';
                inputEmail.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        }
        return true;
    }

    function updateSteps(step) {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        document.querySelector(`.step-tab[data-step="${step}"]`).classList.add('active');
        document.getElementById(`step-${step}`).classList.add('active');

        if (step === 1) {
            btnPrev.innerHTML = '<i class="fa-solid fa-house"></i> Ana Sayfa';
        } else {
            btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i> Geri';
        }

        if (step === totalSteps) {
            btnNext.innerHTML = '<i class="fa-solid fa-check"></i> Tamamla';
            btnNext.style.backgroundColor = '#10b981';
        } else {
            btnNext.innerHTML = 'Devam <i class="fa-solid fa-chevron-right"></i>';
            btnNext.style.removeProperty('background-color');
        }

        const percentage = (step / totalSteps) * 100;
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `Adım ${step} / ${totalSteps}`;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetStep = parseInt(tab.getAttribute('data-step'));
            if (validateStep(currentStep) || targetStep < currentStep) {
                currentStep = targetStep;
                updateSteps(currentStep);
            }
        });
    });

    btnNext.addEventListener('click', () => {
        if (!validateStep(currentStep)) return;

        if (currentStep < totalSteps) {
            currentStep++;
            updateSteps(currentStep);
            document.querySelector('.editor-panel').scrollTo(0, 0);
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateSteps(currentStep);
            document.querySelector('.editor-panel').scrollTo(0, 0);
        } else if (currentStep === 1) {
            showLandingPage();
        }
    });

    // ==========================================
    // 3. CANLI ÖNİZLEME & E-POSTA KONTROLÜ
    // ==========================================
    const inputs = [
        { id: 'inputTitle', renderId: 'renderTitle' },
        { id: 'inputPhone', renderId: 'renderPhone', icon: '<i class="fa-solid fa-phone"></i> ' },
        { id: 'inputLocation', renderId: 'renderLocation', icon: '<i class="fa-solid fa-location-dot"></i> ' },
        { id: 'inputAbout', renderId: 'renderAbout' }
    ];

    inputs.forEach(item => {
        const inputEl = document.getElementById(item.id);
        const renderEl = document.getElementById(item.renderId);
        if (inputEl && renderEl) {
            inputEl.addEventListener('input', () => {
                renderEl.innerHTML = (item.icon || '') + (inputEl.value || inputEl.getAttribute('placeholder'));
            });
        }
    });

    // E-Posta Önizlemesi (Sadece @ varsa veya varsayılan hali basılır)
    const renderEmail = document.getElementById('renderEmail');
    if (inputEmail && renderEmail) {
        inputEmail.addEventListener('input', () => {
            const val = inputEmail.value.trim();
            if (val.includes('@')) {
                renderEmail.innerHTML = `<i class="fa-solid fa-envelope"></i> ` + val;
                if (emailError) emailError.style.display = 'none';
                inputEmail.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            } else if (val === '') {
                renderEmail.innerHTML = `<i class="fa-solid fa-envelope"></i> denizkus@example.com`;
                if (emailError) emailError.style.display = 'none';
            }
        });
    }

    // İsim & Soyisim
    const inputName = document.getElementById('inputName');
    const inputSurname = document.getElementById('inputSurname');
    const renderFullName = document.getElementById('renderFullName');

    function updateName() {
        const name = inputName.value.trim() || 'DENİZ';
        const surname = inputSurname.value.trim() || 'KUŞ';
        renderFullName.textContent = `${name} ${surname}`.toUpperCase();
    }
    inputName.addEventListener('input', updateName);
    inputSurname.addEventListener('input', updateName);

    // Profil Fotoğrafı
    const inputPhoto = document.getElementById('inputPhoto');
    const renderPhoto = document.getElementById('renderPhoto');
    const defaultAvatarIcon = document.getElementById('defaultAvatarIcon');

    if (inputPhoto) {
        inputPhoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    renderPhoto.src = event.target.result;
                    renderPhoto.style.display = 'block';
                    defaultAvatarIcon.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Virgülle Ayrılmış Listeler
    function renderCommaList(inputId, renderId) {
        const input = document.getElementById(inputId);
        const ul = document.getElementById(renderId);
        if (!input || !ul) return;

        input.addEventListener('input', () => {
            ul.innerHTML = '';
            const items = input.value.split(',').map(item => item.trim()).filter(item => item !== '');
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
        });
    }

    renderCommaList('inputSkills', 'renderSkills');
    renderCommaList('inputLangs', 'renderLangs');
    renderCommaList('inputCert', 'renderCert');

    // ==========================================
    // 4. DİNAMİK ALANLAR & YIL/TARİH HARF KİLİDİ
    // ==========================================
    function setupDynamicSection(addBtnId, containerId, renderListId, placeholders, renderTemplate) {
        const addBtn = document.getElementById(addBtnId);
        const container = document.getElementById(containerId);
        const renderList = document.getElementById(renderListId);

        if (!addBtn || !container || !renderList) return;

        function updateRender() {
            renderList.innerHTML = '';
            const items = container.querySelectorAll('.dynamic-item');
            items.forEach(item => {
                const inputs = item.querySelectorAll('input, textarea');
                const values = Array.from(inputs).map(inp => inp.value);
                if (values.some(v => v.trim() !== '')) {
                    renderList.innerHTML += renderTemplate(values);
                }
            });
        }

        addBtn.addEventListener('click', () => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'dynamic-item form-section';
            itemDiv.style.marginBottom = '10px';
            itemDiv.style.padding = '12px';
            itemDiv.style.background = 'var(--bg-dark)';
            itemDiv.style.position = 'relative';

            let innerHTML = `<div class="form-grid">`;
            placeholders.forEach((ph) => {
                const isTextarea = ph.type === 'textarea';
                const isDate = ph.isDate === true;
                innerHTML += `
                    <div class="form-group" ${isTextarea ? 'style="grid-column: span 2;"' : ''}>
                        <label>${ph.label}</label>
                        <${isTextarea ? 'textarea rows="3"' : 'input type="text"'} class="dyn-input ${isDate ? 'date-input-lock' : ''}" placeholder="${ph.placeholder}"></${isTextarea ? 'textarea' : 'input'}>
                    </div>
                `;
            });
            innerHTML += `</div><button class="btn btn-outline btn-delete-item" style="color: #ef4444; border-color: #ef4444; width: 100%; margin-top: 5px;"><i class="fa-solid fa-trash"></i> Sil</button>`;

            itemDiv.innerHTML = innerHTML;
            container.appendChild(itemDiv);

            // Tarih / Yıl alanlarına HARF GİRİŞİNİ ENGELLE (Sadece Rakam, Tire, Boşluk ve Slash)
            itemDiv.querySelectorAll('.date-input-lock').forEach(dateInput => {
                dateInput.addEventListener('input', (e) => {
                    e.target.value = e.target.value.replace(/[^0-9\s\-\/\.]/g, '');
                });
            });

            itemDiv.querySelector('.btn-delete-item').addEventListener('click', () => {
                itemDiv.remove();
                updateRender();
            });

            itemDiv.querySelectorAll('.dyn-input').forEach(input => {
                input.addEventListener('input', updateRender);
            });

            updateRender();
        });
    }

    // Eğitim (Tarih kilitli)
    setupDynamicSection(
        'btnAddEducation', 'educationContainer', 'renderEducationList',
        [
            { label: 'Okul / Üniversite', placeholder: 'Örn: Boğaziçi Üniversitesi' },
            { label: 'Bölüm', placeholder: 'Örn: Bilgisayar Mühendisliği' },
            { label: 'Tarih / Yıl', placeholder: 'Örn: 2018 - 2022', isDate: true }
        ],
        (v) => `<div class="education-item"><h4>${v[0] || 'Okul Adı'}</h4><div class="date">${v[2] || 'Tarih'}</div><p>${v[1] || 'Bölüm'}</p></div>`
    );

    // İş Deneyimi (Tarih kilitli)
    setupDynamicSection(
        'btnAddExperience', 'experienceContainer', 'renderExperienceList',
        [
            { label: 'Şirket', placeholder: 'Örn: Google' },
            { label: 'Pozisyon', placeholder: 'Örn: Frontend Developer' },
            { label: 'Tarih / Yıl', placeholder: 'Örn: 2022 - 2024', isDate: true },
            { label: 'Açıklama', placeholder: 'Yaptığınız işleri kısaca anlatın...', type: 'textarea' }
        ],
        (v) => `<div class="experience-item"><h4>${v[1] || 'Pozisyon'} - ${v[0] || 'Şirket'}</h4><div class="date">${v[2] || 'Tarih'}</div><p>${v[3] || 'İş açıklaması.'}</p></div>`
    );

    // Projeler (Tarih/Teknoloji)
    setupDynamicSection(
        'btnAddProject', 'projectsContainer', 'renderProjectList',
        [
            { label: 'Proje Adı', placeholder: 'Örn: E-Ticaret Uygulaması' },
            { label: 'Tarih / Yıl', placeholder: 'Örn: 2024', isDate: true },
            { label: 'Açıklama', placeholder: 'Proje detayları...', type: 'textarea' }
        ],
        (v) => `<div class="project-item"><h4>${v[0] || 'Proje Adı'}</h4><div class="date">${v[1] || 'Tarih'}</div><p>${v[2] || 'Proje açıklaması.'}</p></div>`
    );

    // ==========================================
    // 5. ŞABLON DEĞİŞTİRME & ZOOM & PDF İNDİRME
    // ==========================================
    function updateTemplate(templateName) {
        cvCanvas.className = `a4-paper ${templateName}`;
    }

    if (templateSelect) {
        templateSelect.addEventListener('change', (e) => {
            updateTemplate(e.target.value);
        });
    }

    // Zoom Kontrolleri
    const zoomBtns = document.querySelectorAll('.btn-zoom');
    zoomBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            zoomBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const text = e.target.textContent;
            if (text === '100%') {
                cvCanvas.style.transform = 'scale(1)';
                cvCanvas.style.transformOrigin = 'top center';
            } else if (text === '75%') {
                cvCanvas.style.transform = 'scale(0.75)';
                cvCanvas.style.transformOrigin = 'top center';
            } else if (text === 'Sığdır') {
                const containerWidth = document.querySelector('.canvas-container').clientWidth - 60;
                const scale = Math.min(containerWidth / 794, 1);
                cvCanvas.style.transform = `scale(${scale})`;
                cvCanvas.style.transformOrigin = 'top center';
            }
        });
    });

    // ==========================================
    // PDF İNDİRME (ZORLA TEK SAYFA KİLİDİ)
    // ==========================================
    const downloadBtn = document.getElementById('downloadPdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const originalTransform = cvCanvas.style.transform;
            cvCanvas.style.transform = 'none';

            cvCanvas.style.height = '1123px';
            const sidebar = cvCanvas.querySelector('.cv-sidebar');
            const mainContent = cvCanvas.querySelector('.cv-main-content');
            if(sidebar) sidebar.style.height = '1123px';
            if(mainContent) mainContent.style.height = '1123px';

            const opt = {
                margin:       0,
                filename:     'CVPRO_Ozgecmis.pdf',
                image:        { type: 'jpeg', quality: 1.0 },
                html2canvas:  {
                    scale: 2,
                    useCORS: true,
                    width: 794,
                    height: 1123,
                    windowWidth: 794,
                    windowHeight: 1123,
                    scrollY: 0,
                    scrollX: 0
                },
                jsPDF:        {
                    unit: 'px',
                    format: [794, 1123],
                    orientation: 'portrait',
                    hotfixes: ['px_scaling']
                }
            };

            html2pdf().from(cvCanvas).set(opt).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages();
                if (totalPages > 1) {
                    for (let i = totalPages; i > 1; i--) {
                        pdf.deletePage(i);
                    }
                }
            }).save().then(() => {
                cvCanvas.style.transform = originalTransform;
            });
        });
    }
});