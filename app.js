document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landingPage');
    const editorWorkspace = document.getElementById('editorWorkspace');
    const navLogo = document.getElementById('navLogo');
    const btnChangeTemplate = document.getElementById('btnChangeTemplate');
    const cvCanvas = document.getElementById('cvCanvas');
    const templateSelect = document.getElementById('templateSelect');
    const btnStartNow = document.getElementById('btnStartNow');
    const navLinks = document.querySelectorAll('.nav-links a');

    // ===== DİNAMİK VERİ YAPI TAŞLARI (STATE) =====
    let dataState = { projects: [], education: [], experience: [] };

    // ===== YEREL HAFIZADAN GÜVENLİ YÜKLEME =====
    const loadFromLocalStorage = () => {
        try {
            const rawData = localStorage.getItem('cvpro_data_v2');
            if (rawData) {
                const savedData = JSON.parse(rawData);
                if (savedData.template && templateSelect) templateSelect.value = savedData.template;
                
                const setVal = (id, val) => { if(document.getElementById(id)) document.getElementById(id).value = val || ''; };
                
                setVal('inputName', savedData.name);
                setVal('inputSurname', savedData.surname);
                setVal('inputTitle', savedData.title);
                setVal('inputEmail', savedData.email);
                setVal('inputPhone', savedData.phone);
                setVal('inputLocation', savedData.location);
                setVal('inputSkills', savedData.skills);
                setVal('inputCert', savedData.cert);
                setVal('inputLangs', savedData.langs);
                setVal('inputAbout', savedData.about);

                if (savedData.photo && savedData.photo.startsWith('data:image')) {
                    const renderPhoto = document.getElementById('renderPhoto');
                    const defaultAvatarIcon = document.getElementById('defaultAvatarIcon');
                    if(renderPhoto && defaultAvatarIcon) {
                        renderPhoto.src = savedData.photo;
                        renderPhoto.style.display = 'block';
                        defaultAvatarIcon.style.display = 'none';
                    }
                }

                if(Array.isArray(savedData.projects)) dataState.projects = savedData.projects;
                if(Array.isArray(savedData.education)) dataState.education = savedData.education;
                if(Array.isArray(savedData.experience)) dataState.experience = savedData.experience;
            }
        } catch (error) {
            console.warn("Önceki veriler hatalı, sistem temizleniyor...", error);
            localStorage.removeItem('cvpro_data_v2');
        }

        if (dataState.projects.length === 0) dataState.projects.push({ title: '', tech: '', desc: '' });
        if (dataState.education.length === 0) dataState.education.push({ school: '', dept: '', date: '' });
        if (dataState.experience.length === 0) dataState.experience.push({ company: '', role: '', date: '' });

        renderDynamicForms();
        updateAllPreviews();
        validateEmailAndPhone(); // Yüklemede kontrol et
    };

    // ===== YEREL HAFIZAYA KAYDETME =====
    const saveToLocalStorage = () => {
        if(!templateSelect) return;
        const data = {
            template: templateSelect.value,
            name: document.getElementById('inputName').value,
            surname: document.getElementById('inputSurname').value,
            title: document.getElementById('inputTitle').value,
            email: document.getElementById('inputEmail').value,
            phone: document.getElementById('inputPhone').value,
            location: document.getElementById('inputLocation').value,
            skills: document.getElementById('inputSkills').value,
            cert: document.getElementById('inputCert').value,
            langs: document.getElementById('inputLangs').value,
            about: document.getElementById('inputAbout').value,
            photo: document.getElementById('renderPhoto').src,
            projects: dataState.projects,
            education: dataState.education,
            experience: dataState.experience
        };
        localStorage.setItem('cvpro_data_v2', JSON.stringify(data));
    };

    // ===== REGEX İLE E-POSTA VE TELEFON DOĞRULAMA (VALIDATION) =====
    const validateEmailAndPhone = () => {
        const emailInput = document.getElementById('inputEmail');
        const phoneInput = document.getElementById('inputPhone');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');

        if (!emailInput || !phoneInput) return;

        // E-posta Regex Kuralı
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal !== '' && !emailRegex.test(emailVal)) {
            emailInput.classList.add('is-invalid');
            if(emailError) emailError.classList.add('active');
        } else {
            emailInput.classList.remove('is-invalid');
            if(emailError) emailError.classList.remove('active');
        }

        // Telefon Regex Kuralı (En az 10 hane, rakam/boşluk/artı işareti kabul eder)
        const phoneVal = phoneInput.value.trim();
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (phoneVal !== '' && !phoneRegex.test(phoneVal)) {
            phoneInput.classList.add('is-invalid');
            if(phoneError) phoneError.classList.add('active');
        } else {
            phoneInput.classList.remove('is-invalid');
            if(phoneError) phoneError.classList.remove('active');
        }
    };

    // ===== DİNAMİK FORMLARI ÇİZME =====
    const renderDynamicForms = () => {
        const projContainer = document.getElementById('projectsContainer');
        const eduContainer = document.getElementById('educationContainer');
        const expContainer = document.getElementById('experienceContainer');

        if(projContainer) {
            projContainer.innerHTML = dataState.projects.map((proj, index) => `
                <div class="dynamic-group" style="background: var(--bg-dark); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--border-color);">
                    <div class="form-group"><label>Proje Adı</label><input type="text" class="proj-title" data-index="${index}" value="${proj.title}" placeholder="Akıllı E-Ticaret Platformu"></div>
                    <div class="form-group"><label>Teknolojiler</label><input type="text" class="proj-tech" data-index="${index}" value="${proj.tech}" placeholder="React, Node.js"></div>
                    <div class="form-group"><label>Açıklama</label><textarea class="proj-desc" data-index="${index}" rows="2" placeholder="Gelişmiş filtreleme...">${proj.desc}</textarea></div>
                    ${dataState.projects.length > 1 ? `<button type="button" class="btn btn-outline btn-remove-proj" data-index="${index}" style="color: #ef4444; border-color: #ef4444; margin-top: 5px;"><i class="fa-solid fa-trash"></i> Sil</button>` : ''}
                </div>`).join('');
        }

        if(eduContainer) {
            eduContainer.innerHTML = dataState.education.map((edu, index) => `
                <div class="dynamic-group" style="background: var(--bg-dark); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--border-color);">
                    <div class="form-group"><label>Okul / Üniversite</label><input type="text" class="edu-school" data-index="${index}" value="${edu.school}" placeholder="Çukurova Üniversitesi"></div>
                    <div class="form-group"><label>Bölüm</label><input type="text" class="edu-dept" data-index="${index}" value="${edu.dept}" placeholder="Bilgisayar Mühendisliği"></div>
                    <div class="form-group"><label>Tarih</label><input type="text" class="edu-date" data-index="${index}" value="${edu.date}" placeholder="2020 - 2024"></div>
                    ${dataState.education.length > 1 ? `<button type="button" class="btn btn-outline btn-remove-edu" data-index="${index}" style="color: #ef4444; border-color: #ef4444; margin-top: 5px;"><i class="fa-solid fa-trash"></i> Sil</button>` : ''}
                </div>`).join('');
        }

        if(expContainer) {
            expContainer.innerHTML = dataState.experience.map((exp, index) => `
                <div class="dynamic-group" style="background: var(--bg-dark); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid var(--border-color);">
                    <div class="form-group"><label>Şirket</label><input type="text" class="exp-company" data-index="${index}" value="${exp.company}" placeholder="Tech Solutions A.Ş."></div>
                    <div class="form-group"><label>Rol</label><input type="text" class="exp-role" data-index="${index}" value="${exp.role}" placeholder="Yazılım Geliştirici"></div>
                    <div class="form-group"><label>Tarih</label><input type="text" class="exp-date" data-index="${index}" value="${exp.date}" placeholder="2022 - Devam Ediyor"></div>
                    ${dataState.experience.length > 1 ? `<button type="button" class="btn btn-outline btn-remove-exp" data-index="${index}" style="color: #ef4444; border-color: #ef4444; margin-top: 5px;"><i class="fa-solid fa-trash"></i> Sil</button>` : ''}
                </div>`).join('');
        }

        attachDynamicEventListeners();
    };

    const attachDynamicEventListeners = () => {
        const bindDynamicInput = (className, arrayName, propName) => {
            document.querySelectorAll(`.${className}`).forEach(input => {
                input.addEventListener('input', (e) => {
                    const idx = e.target.dataset.index;
                    dataState[arrayName][idx][propName] = e.target.value;
                    updateAllPreviews();
                    saveToLocalStorage();
                });
            });
        };

        bindDynamicInput('proj-title', 'projects', 'title');
        bindDynamicInput('proj-tech', 'projects', 'tech');
        bindDynamicInput('proj-desc', 'projects', 'desc');

        bindDynamicInput('edu-school', 'education', 'school');
        bindDynamicInput('edu-dept', 'education', 'dept');
        bindDynamicInput('edu-date', 'education', 'date');

        bindDynamicInput('exp-company', 'experience', 'company');
        bindDynamicInput('exp-role', 'experience', 'role');
        bindDynamicInput('exp-date', 'experience', 'date');

        const bindDelete = (btnClass, arrayName) => {
            document.querySelectorAll(`.${btnClass}`).forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.closest('button').dataset.index;
                    dataState[arrayName].splice(idx, 1);
                    renderDynamicForms();
                    updateAllPreviews();
                    saveToLocalStorage();
                });
            });
        };

        bindDelete('btn-remove-proj', 'projects');
        bindDelete('btn-remove-edu', 'education');
        bindDelete('btn-remove-exp', 'experience');
    };

    if(document.getElementById('btnAddProject')) document.getElementById('btnAddProject').addEventListener('click', () => { dataState.projects.push({ title: '', tech: '', desc: '' }); renderDynamicForms(); saveToLocalStorage(); updateAllPreviews(); });
    if(document.getElementById('btnAddEducation')) document.getElementById('btnAddEducation').addEventListener('click', () => { dataState.education.push({ school: '', dept: '', date: '' }); renderDynamicForms(); saveToLocalStorage(); updateAllPreviews(); });
    if(document.getElementById('btnAddExperience')) document.getElementById('btnAddExperience').addEventListener('click', () => { dataState.experience.push({ company: '', role: '', date: '' }); renderDynamicForms(); saveToLocalStorage(); updateAllPreviews(); });

    // ===== ÖNİZLEMELERİ (CV A4) GÜNCELLEME =====
    const updateAllPreviews = () => {
        const nameInput = document.getElementById('inputName');
        const surnameInput = document.getElementById('inputSurname');
        if(!nameInput || !surnameInput) return;

        const name = nameInput.value.trim() || nameInput.placeholder;
        const surname = surnameInput.value.trim() || surnameInput.placeholder;
        document.getElementById('renderFullName').textContent = `${name} ${surname}`.toUpperCase();

        const updateStatic = (inputId, renderId, prefix='', suffix='') => {
            const el = document.getElementById(inputId);
            const renderEl = document.getElementById(renderId);
            if(el && renderEl) {
                const val = el.value.trim() || el.placeholder;
                renderEl.innerHTML = val ? `${prefix}${val}${suffix}` : '';
            }
        };

        updateStatic('inputTitle', 'renderTitle');
        updateStatic('inputEmail', 'renderEmail', '<i class="fa-solid fa-envelope"></i> ');
        updateStatic('inputPhone', 'renderPhone', '<i class="fa-solid fa-phone"></i> ');
        updateStatic('inputLocation', 'renderLocation', '<i class="fa-solid fa-location-dot"></i> ');
        updateStatic('inputAbout', 'renderAbout');

        const updateList = (inputId, renderId) => {
            const el = document.getElementById(inputId);
            const renderEl = document.getElementById(renderId);
            if(el && renderEl) {
                const val = el.value.trim() || el.placeholder;
                const items = val.split(',').filter(s => s.trim() !== '');
                renderEl.innerHTML = items.map(i => `<li>${i.trim()}</li>`).join('');
            }
        };
        updateList('inputSkills', 'renderSkills');
        updateList('inputLangs', 'renderLangs');
        updateList('inputCert', 'renderCert');

        if(document.getElementById('renderProjectList')) {
            document.getElementById('renderProjectList').innerHTML = dataState.projects.map(p => {
                const title = p.title.trim() || 'Akıllı E-Ticaret Platformu';
                const tech = p.tech.trim() || 'React, Node.js, MongoDB';
                const desc = p.desc.trim() || 'Kullanıcı dostu arayüzü ve gelişmiş filtreleme seçenekleriyle tam kapsamlı e-ticaret uygulaması.';
                return `<div class="project-item"><h4>${title}</h4><p style="font-weight: 500; color: #475569; font-size: 13px;">Teknolojiler: ${tech}</p><p>${desc}</p></div>`;
            }).join('');
        }

        if(document.getElementById('renderEducationList')) {
            document.getElementById('renderEducationList').innerHTML = dataState.education.map(e => {
                const school = e.school.trim() || 'Çukurova Üniversitesi';
                const dept = e.dept.trim() || 'Bilgisayar Mühendisliği';
                const date = e.date.trim() || '2020 - 2024';
                return `<div class="education-item"><h4>${school}</h4><p>${dept}</p><p class="date">${date}</p></div>`;
            }).join('');
        }

        if(document.getElementById('renderExperienceList')) {
            document.getElementById('renderExperienceList').innerHTML = dataState.experience.map(e => {
                const company = e.company.trim() || 'Tech Solutions A.Ş.';
                const role = e.role.trim() || 'Frontend Geliştirici';
                const date = e.date.trim() || 'Haziran 2024 - Devam Ediyor';
                return `<div class="experience-item"><h4>${company}</h4><p>${role}</p><p class="date">${date}</p></div>`;
            }).join('');
        }
    };

    ['inputName', 'inputSurname', 'inputTitle', 'inputEmail', 'inputPhone', 'inputLocation', 'inputAbout', 'inputSkills', 'inputLangs', 'inputCert'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.addEventListener('input', () => { 
                updateAllPreviews(); 
                saveToLocalStorage(); 
                if(id === 'inputEmail' || id === 'inputPhone') {
                    validateEmailAndPhone();
                }
            });
        }
    });

    const inputPhoto = document.getElementById('inputPhoto');
    const renderPhoto = document.getElementById('renderPhoto');
    const defaultAvatarIcon = document.getElementById('defaultAvatarIcon');

    if (inputPhoto) {
        inputPhoto.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    renderPhoto.src = e.target.result;
                    renderPhoto.style.display = 'block';
                    defaultAvatarIcon.style.display = 'none';
                    saveToLocalStorage(); 
                };
                reader.readAsDataURL(file); 
            } else {
                renderPhoto.src = '';
                renderPhoto.style.display = 'none';
                defaultAvatarIcon.style.display = 'block';
                saveToLocalStorage(); 
            }
        });
    }

    // ===== EKRAN, ADIM VE ŞABLON DEĞİŞTİRME MANTIKLARI =====
    function applyTemplate(templateName) {
        if(!cvCanvas || !templateSelect) return;
        cvCanvas.className = `a4-paper ${templateName}`;
        templateSelect.value = templateName;
        saveToLocalStorage();
    }
    
    if(btnStartNow) {
        btnStartNow.addEventListener('click', () => {
            openEditor(templateSelect ? templateSelect.value : 'minimal-slate');
        });
    }

    if(templateSelect) {
        templateSelect.addEventListener('change', (e) => applyTemplate(e.target.value));
    }
    
    if(btnChangeTemplate) {
        btnChangeTemplate.addEventListener('click', () => {
            editorWorkspace.classList.remove('active');
            landingPage.classList.add('active');
            if(navLinks.length >= 2) {
                navLinks[0].classList.add('active');
                navLinks[1].classList.remove('active');
            }
        });
    }

    function openEditor(templateName) {
        if (templateName) applyTemplate(templateName);
        if(landingPage) landingPage.classList.remove('active');
        if(editorWorkspace) editorWorkspace.classList.add('active');
        setTimeout(() => goToStep(1), 100);
    }

    function openLanding() {
        if(editorWorkspace) editorWorkspace.classList.remove('active');
        if(landingPage) landingPage.classList.add('active');
        window.scrollTo(0,0);
        if(navLinks.length >= 2) {
            navLinks[0].classList.add('active');
            navLinks[1].classList.remove('active');
        }
    }

    // ====== KESİN TIKLAMA ÇÖZÜMÜ (EVENT DELEGATION) ======
    document.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.template-card');
        if (clickedCard) {
            e.preventDefault(); 
            const templateName = clickedCard.getAttribute('data-template');
            openEditor(templateName);
        }
    });

    if(navLogo) navLogo.addEventListener('click', openLanding);

    if (navLinks.length >= 2) {
        navLinks[0].addEventListener('click', (e) => {
            e.preventDefault();
            openLanding();
        });

        navLinks[1].addEventListener('click', (e) => {
            if (editorWorkspace && editorWorkspace.classList.contains('active')) {
                openLanding();
            }
            navLinks[0].classList.remove('active');
            navLinks[1].classList.add('active');
        });
    }

    let currentStep = 1;
    function goToStep(step) {
        if (step < 1 || step > 8) return;
        currentStep = step;

        document.querySelectorAll('.step-tab').forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`.step-tab[data-step="${step}"]`);
        if(activeTab) activeTab.classList.add('active');

        document.querySelectorAll('.step-content').forEach(c => c.classList.remove('active'));
        const activeContent = document.getElementById(`step-${step}`);
        if(activeContent) activeContent.classList.add('active');

        const progressBar = document.getElementById('progressBar');
        if(progressBar) progressBar.style.width = `${(step / 8) * 100}%`;
        
        const progressText = document.getElementById('progressText');
        if(progressText) progressText.textContent = `Adım ${step} / 8`;

        const btnPrev = document.getElementById('btnPrev');
        if(btnPrev) btnPrev.disabled = step === 1;
        
        const btnNext = document.getElementById('btnNext');
        if(btnNext) btnNext.innerHTML = step === 8 ? '<i class="fa-solid fa-check"></i> Tamamlandı' : 'Devam <i class="fa-solid fa-chevron-right"></i>';
    }

    const btnNextNode = document.getElementById('btnNext');
    if(btnNextNode) btnNextNode.addEventListener('click', () => goToStep(currentStep + 1));
    
    const btnPrevNode = document.getElementById('btnPrev');
    if(btnPrevNode) btnPrevNode.addEventListener('click', () => goToStep(currentStep - 1));
    
    document.querySelectorAll('.step-tab').forEach(tab => tab.addEventListener('click', () => goToStep(parseInt(tab.dataset.step))));

    const downloadBtn = document.getElementById('downloadPdf');
    if(downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const element = document.getElementById('cvCanvas');
            const nameInput = document.getElementById('inputName');
            const name = (nameInput ? nameInput.value.trim() : '') || (nameInput ? nameInput.placeholder : '') || 'CV';
            
            const opt = {
                margin: 0,
                filename: `${name}_CV.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            const ogText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İndiriliyor...';
            downloadBtn.disabled = true;
            
            html2pdf().set(opt).from(element).save().then(() => {
                downloadBtn.innerHTML = ogText;
                downloadBtn.disabled = false;
            }).catch(() => {
                downloadBtn.innerHTML = ogText;
                downloadBtn.disabled = false;
            });
        });
    }

    // İLK AÇILIŞ
    loadFromLocalStorage();
    if(templateSelect && templateSelect.value) applyTemplate(templateSelect.value);
});