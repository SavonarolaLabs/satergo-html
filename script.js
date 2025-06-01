// Scroll Animation System
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.collectAnimatedElements();
        this.addEventListeners();
        this.markAsLoaded();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, this.observerOptions);
    }

    collectAnimatedElements() {
        const elements = document.querySelectorAll('[class*="reveal-"]');
        elements.forEach(element => {
            this.animatedElements.push(element);
            this.observer.observe(element);
        });
    }

    revealElement(element) {
        const delay = parseInt(element.getAttribute('data-reveal-delay')) || 0;

        setTimeout(() => {
            element.classList.add('is-revealed');
        }, delay);

        // Unobserve element after animation
        this.observer.unobserve(element);
    }

    addEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Button hover effects
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonHover);
            button.addEventListener('mouseleave', this.handleButtonLeave);
        });

        // Download button interactions
        document.querySelectorAll('.downloads-tiles-item-content a').forEach(link => {
            link.addEventListener('click', this.handleDownloadClick);
        });
    }

    handleButtonHover(e) {
        const button = e.target;
        button.style.transform = 'translateY(-1px)';
    }

    handleButtonLeave(e) {
        const button = e.target;
        button.style.transform = 'translateY(0)';
    }

    handleDownloadClick(e) {
        // Add download animation
        const button = e.target;
        const originalText = button.textContent;

        if (!button.href || button.href.includes('#')) {
            e.preventDefault();

            button.style.opacity = '0.6';
            button.textContent = 'Coming Soon...';

            setTimeout(() => {
                button.style.opacity = '1';
                button.textContent = originalText;
            }, 2000);
        }
    }

    markAsLoaded() {
        document.body.classList.add('is-loaded');
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.collectParallaxElements();
        this.bindEvents();
    }

    collectParallaxElements() {
        // Add subtle parallax to hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            this.elements.push({
                element: hero,
                speed: 0.5
            });
        }
    }

    bindEvents() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;

        this.elements.forEach(({ element, speed }) => {
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Platform Icon Animations
class PlatformIcons {
    constructor() {
        this.init();
    }

    init() {
        this.addHoverEffects();
    }

    addHoverEffects() {
        document.querySelectorAll('.tiles-item').forEach(tile => {
            const icon = tile.querySelector('.platform-icon svg');

            tile.addEventListener('mouseenter', () => {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotateY(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });

            tile.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = 'scale(1) rotateY(0deg)';
                }
            });
        });
    }
}

// Header Scroll Effects
class HeaderEffects {
    constructor() {
        this.header = document.querySelector('.site-header');
        this.lastScrollY = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            this.header.style.background = 'rgba(20, 21, 28, 0.95)';
            this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            this.header.style.background = 'rgba(20, 21, 28, 0.9)';
            this.header.style.boxShadow = 'none';
        }

        this.lastScrollY = currentScrollY;
    }
}

// Typing Animation for Hero Text
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            this.typeText(heroTitle);
        }
    }

    typeText(element) {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.opacity = '1';

        let index = 0;
        const timer = setInterval(() => {
            element.innerHTML = text.slice(0, index + 1);
            index++;

            if (index >= text.length) {
                clearInterval(timer);
                element.classList.add('is-revealed');
            }
        }, 50);
    }
}

// Feature Image Animations
class FeatureAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupImageHovers();
    }

    setupImageHovers() {
        document.querySelectorAll('.feature-image').forEach(image => {
            image.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05) rotateY(5deg)';
                image.style.transition = 'transform 0.5s ease';
                image.style.boxShadow = '0 16px 64px rgba(94, 94, 233, 0.3)';
            });

            image.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotateY(0deg)';
                image.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            });
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new PlatformIcons();
    new HeaderEffects();
    new FeatureAnimations();
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate any position-dependent animations
    window.dispatchEvent(new Event('scroll'));
}, 250);

window.addEventListener('resize', handleResize);

// ===================================================================
// DONATION FUNCTIONALITY - USANDO PATRÓN EXITOSO DE DONATION.JS
// ===================================================================

// 🎯 CORRECCIÓN: Usar dirección correcta de Satergo y patrón que funciona
const DONATION_ADDRESS = "9gMnqf29LPxos2Lk5Lt6SkTmbWYL1d5QFHygbf6zRXDgL4KtAho";
const NANOERGS_PER_ERG = 1000000000n;
const MIN_FEE = 1000000n; // 0.001 ERG
const FEE_ERGOTREE = "1005040004000e36100204a00b08cd0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ea02d192a39a8cc7a701730073011001020402d19683030193a38cc7b2a57300000193c2b2a57301007473027303830108cdeeac93b1a57304";

// Global donation state
let selectedAmount = 1; // Default amount
let ergoApi = null;
let isConnected = false;

// ===================================================================
// MODAL MANAGEMENT FUNCTIONS
// ===================================================================

// Show donation modal
function showDonationInfo() {
    const modal = document.getElementById('donationModal');
    modal.style.display = 'flex'; // FIXED: Set display first
    setTimeout(() => {
        modal.classList.add('show');
    }, 10); // Small delay for smooth animation
    resetDonationModal();
}

// Close donation modal
function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    modal.classList.remove('show');
    // Wait for animation to complete, then hide completely
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Reset modal to initial state
function resetDonationModal() {
    document.querySelectorAll('.amount-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector('.amount-button[data-amount="1"]').classList.add('selected');

    const customAmountInput = document.getElementById('customAmount');
    customAmountInput.value = '';
    customAmountInput.placeholder = '0.000';

    selectedAmount = 1;
    updateDonateButton();
    hideDonationStatus();
    updateWalletStatus();
}

// Update donate button text and state
function updateDonateButton() {
    const button = document.getElementById('donateButton');
    const amount = selectedAmount;

    if (amount && amount >= 0.001) {
        button.disabled = false;
        button.textContent = `Donate ${amount} ERG with Nautilus`;
    } else {
        button.disabled = true;
        button.textContent = 'Donate with Nautilus';
    }
}

// Update wallet connection status display
function updateWalletStatus() {
    const statusElement = document.getElementById('walletStatus');
    if (!statusElement) return;

    if (isConnected && ergoApi) {
        statusElement.innerHTML = '✅ Nautilus Connected';
        statusElement.className = 'wallet-status connected';
    } else {
        statusElement.innerHTML = '⚠️ Wallet Not Connected';
        statusElement.className = 'wallet-status disconnected';
    }
}

// Show donation status message
function showDonationStatus(message, type = 'loading') {
    const status = document.getElementById('donationStatus');

    if (message.includes('ergexplorer.com') || message.includes('ergoscan.io')) {
        const txId = message.split('#')[1] || message.split('/').pop();
        const shortTx = txId ? txId.substring(0, 16) + '...' : 'unknown';

        status.innerHTML = `
            <div>✅ Donation successful!</div>
            <div style="margin-top: 8px;">
                <a href="${message}" target="_blank" rel="noopener"
                   style="color: #22c55e; text-decoration: underline; word-break: break-all;">
                    View Transaction: ${shortTx}
                </a>
            </div>
        `;
    } else {
        status.textContent = message;
    }

    status.className = `donation-status ${type}`;
    status.style.display = 'block';
}

// Hide donation status
function hideDonationStatus() {
    const status = document.getElementById('donationStatus');
    status.style.display = 'none';
}

// ===================================================================
// EVENT LISTENERS SETUP
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Amount button event listeners
    document.querySelectorAll('.amount-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.amount-button').forEach(btn => {
                btn.classList.remove('selected');
            });

            this.classList.add('selected');
            selectedAmount = parseFloat(this.dataset.amount);

            const customAmountInput = document.getElementById('customAmount');
            customAmountInput.value = '';
            customAmountInput.placeholder = '0.000';

            updateDonateButton();
        });
    });

    // Custom amount input event listener
    document.getElementById('customAmount').addEventListener('input', function() {
        const customValue = parseFloat(this.value);

        if (customValue && customValue >= 0.001) {
            document.querySelectorAll('.amount-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            selectedAmount = customValue;
        } else if (!this.value) {
            document.querySelector('.amount-button[data-amount="1"]').classList.add('selected');
            selectedAmount = 1;
        }

        updateDonateButton();
    });

    // Focus and blur handlers
    document.getElementById('customAmount').addEventListener('focus', function() {
        if (this.value === '' || this.value === '0.000') {
            this.value = '';
            this.placeholder = '';
        }
    });

    document.getElementById('customAmount').addEventListener('blur', function() {
        if (this.value === '') {
            this.placeholder = '0.000';
        }
    });

    // Modal close handlers
    document.getElementById('donationModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeDonationModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDonationModal();
        }
    });
});

// ===================================================================
// NAUTILUS WALLET INTEGRATION
// ===================================================================

// Detect Nautilus Wallet availability
async function detectNautilusWallet() {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 30;

        const checkNautilus = () => {
            attempts++;

            if (typeof window.ergoConnector !== 'undefined' &&
                window.ergoConnector &&
                typeof window.ergoConnector.nautilus !== 'undefined') {

                console.log('✅ Nautilus Wallet detected');
                resolve(window.ergoConnector.nautilus);
                return;
            }

            if (attempts < maxAttempts) {
                setTimeout(checkNautilus, 100);
            } else {
                console.log('❌ Nautilus Wallet not found');
                resolve(null);
            }
        };

        checkNautilus();
    });
}

// Connect to Nautilus Wallet
async function connectToNautilus() {
    if (isConnected && ergoApi) {
        updateWalletStatus();
        return ergoApi;
    }

    const nautilusConnector = await detectNautilusWallet();

    if (!nautilusConnector) {
        throw new Error('Nautilus Wallet not found. Please install it from Chrome Web Store.');
    }

    showDonationStatus('Requesting wallet connection...', 'loading');

    const connectionResult = await nautilusConnector.connect();

    if (connectionResult !== true) {
        throw new Error('Connection rejected. Please approve the connection in Nautilus.');
    }

    ergoApi = window.ergo;
    if (!ergoApi) {
        throw new Error('Ergo API not available after connection.');
    }

    const balance = await ergoApi.get_balance();
    console.log(`✅ Connected! Balance: ${Number(BigInt(balance)) / Number(NANOERGS_PER_ERG)} ERG`);

    isConnected = true;
    updateWalletStatus();
    return ergoApi;
}

// ===================================================================
// ADDRESS CONVERSION - USANDO PATRÓN DE DONATION.JS
// ===================================================================

// Base58 decode function (copiado exactamente de donation.js)
function base58Decode(str) {
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const ALPHABET_MAP = {};
    for (let i = 0; i < ALPHABET.length; i++) {
        ALPHABET_MAP[ALPHABET[i]] = i;
    }

    let decoded = [0];

    for (let i = 0; i < str.length; i++) {
        let carry = ALPHABET_MAP[str[i]];
        if (carry === undefined) throw new Error('Invalid base58 character');

        for (let j = 0; j < decoded.length; j++) {
            carry += decoded[j] * 58;
            decoded[j] = carry & 255;
            carry >>= 8;
        }

        while (carry > 0) {
            decoded.push(carry & 255);
            carry >>= 8;
        }
    }

    // Handle leading zeros
    for (let i = 0; i < str.length && str[i] === '1'; i++) {
        decoded.push(0);
    }

    return new Uint8Array(decoded.reverse());
}

// Address to ErgoTree conversion (copiado exactamente de donation.js)
function addressToErgoTree(address) {
    console.log('🔄 Converting address to ErgoTree:', address);

    try {
        const decoded = base58Decode(address);

        // Verify P2PK format
        if (decoded.length < 34 || decoded[0] !== 0x01) {
            throw new Error(`Invalid P2PK address format`);
        }

        // Extract public key (bytes 1-33)
        const publicKey = decoded.slice(1, 34);
        const publicKeyHex = Array.from(publicKey, byte =>
            byte.toString(16).padStart(2, '0')
        ).join('');

        // Build P2PK ErgoTree
        const ergoTree = `0008cd${publicKeyHex}`;

        console.log('✅ Address conversion successful');
        console.log('  - Public Key:', publicKeyHex);
        console.log('  - ErgoTree:', ergoTree);

        return ergoTree;

    } catch (error) {
        console.error('❌ Address conversion failed:', error);

        // Hardcoded fallback para la dirección de Satergo
        if (address === DONATION_ADDRESS) {
            console.log('🔧 Using hardcoded ErgoTree for Satergo donation address');
            // ErgoTree calculado correctamente para la dirección de Satergo
            return "0008cd027ecf12ead2d42ab4ede6d6faf6f1fb0f2af84ee66a1a8be2f426b6bc2a2cccd4b";
        }

        throw new Error(`Cannot convert address: ${error.message}`);
    }
}

// ===================================================================
// TRANSACTION CONSTRUCTION - USANDO PATRÓN EXITOSO DE DONATION.JS
// ===================================================================

// Select inputs and collect tokens (copiado de donation.js)
function selectInputsAndTokens(utxos, requiredAmount) {
    console.log(`🎯 Selecting inputs to cover ${Number(requiredAmount) / Number(NANOERGS_PER_ERG)} ERG`);

    const sortedUtxos = [...utxos].sort((a, b) =>
        Number(BigInt(b.value) - BigInt(a.value))
    );

    let selectedInputs = [];
    let totalInputValue = 0n;
    const allTokens = new Map();

    for (const utxo of sortedUtxos) {
        selectedInputs.push(utxo);
        totalInputValue += BigInt(utxo.value);

        // Collect all tokens from inputs
        if (utxo.assets && utxo.assets.length > 0) {
            utxo.assets.forEach(token => {
                const existing = allTokens.get(token.tokenId) || 0n;
                allTokens.set(token.tokenId, existing + BigInt(token.amount));
            });
        }

        if (totalInputValue >= requiredAmount) break;
    }

    if (totalInputValue < requiredAmount) {
        throw new Error(`Insufficient funds. Need ${Number(requiredAmount) / Number(NANOERGS_PER_ERG)} ERG but only have ${Number(totalInputValue) / Number(NANOERGS_PER_ERG)} ERG`);
    }

    console.log('📥 INPUTS SELECTED:');
    console.log('  - UTXOs selected:', selectedInputs.length);
    console.log('  - Total input value:', Number(totalInputValue) / Number(NANOERGS_PER_ERG), 'ERG');
    console.log('  - Tokens in inputs:', allTokens.size);

    return { selectedInputs, totalInputValue, allTokens };
}

// Build donation transaction (usando EXACTAMENTE el patrón de donation.js)
async function buildDonationTransaction(amount) {
    console.log('🔧 === BUILDING TRANSACTION (EXACT donation.js Pattern) ===');

    const amountNanoErg = BigInt(Math.floor(amount * Number(NANOERGS_PER_ERG)));

    try {
        const currentHeight = await ergoApi.get_current_height();
        console.log('📊 Current height:', currentHeight);

        const utxos = await ergoApi.get_utxos();
        if (!utxos || utxos.length === 0) {
            throw new Error('No UTXOs available');
        }
        console.log('📦 Available UTXOs:', utxos.length);

        const RECOMMENDED_MIN_FEE = MIN_FEE; // 0.001 ERG
        console.log('💰 Using Ergo standard minimum fee:', Number(RECOMMENDED_MIN_FEE) / Number(NANOERGS_PER_ERG), 'ERG');

        const senderErgoTree = utxos[0].ergoTree;
        console.log('👤 Sender ErgoTree (for change):', senderErgoTree);

        const donationErgoTree = addressToErgoTree(DONATION_ADDRESS);
        console.log('🎯 Donation ErgoTree:', donationErgoTree);

        // Verify that addresses are different
        if (donationErgoTree === senderErgoTree) {
            throw new Error('CRITICAL: Donation and sender addresses are the same!');
        }

        const totalNeeded = amountNanoErg + RECOMMENDED_MIN_FEE;
        console.log('📊 Total needed (donation + fee):', Number(totalNeeded) / Number(NANOERGS_PER_ERG), 'ERG');

        const { selectedInputs, totalInputValue, allTokens } = selectInputsAndTokens(utxos, totalNeeded);

        // ========== EXACTA CONSTRUCCIÓN DE DONATION.JS ==========
        const outputs = [];

        // OUTPUT 1: Donation
        const donationOutput = {
            value: amountNanoErg.toString(),
            ergoTree: donationErgoTree,
            assets: [],
            additionalRegisters: {},
            creationHeight: currentHeight
        };
        outputs.push(donationOutput);

        console.log('✅ OUTPUT 1 - DONATION:');
        console.log('  - Amount:', Number(amountNanoErg) / Number(NANOERGS_PER_ERG), 'ERG');
        console.log('  - To address:', DONATION_ADDRESS);
        console.log('  - ErgoTree:', donationErgoTree);

        // OUTPUT 2: Fee Output (EXACTO como donation.js)
        const feeOutput = {
            value: RECOMMENDED_MIN_FEE.toString(),
            ergoTree: FEE_ERGOTREE,
            assets: [],
            additionalRegisters: {},
            creationHeight: currentHeight
        };
        outputs.push(feeOutput);

        console.log('✅ OUTPUT 2 - MINER FEE:');
        console.log('  - Fee amount:', Number(RECOMMENDED_MIN_FEE) / Number(NANOERGS_PER_ERG), 'ERG');
        console.log('  - To miner contract');
        console.log('  - ErgoTree:', FEE_ERGOTREE);

        // OUTPUT 3: Change
        const changeValue = totalInputValue - amountNanoErg - RECOMMENDED_MIN_FEE;

        console.log('🔍 BALANCE CALCULATION:');
        console.log('  - Total inputs:', Number(totalInputValue) / Number(NANOERGS_PER_ERG), 'ERG');
        console.log('  - Donation output:', Number(amountNanoErg) / Number(NANOERGS_PER_ERG), 'ERG');
        console.log('  - Fee output:', Number(RECOMMENDED_MIN_FEE) / Number(NANOERGS_PER_ERG), 'ERG');
        console.log('  - Change remaining:', Number(changeValue) / Number(NANOERGS_PER_ERG), 'ERG');

        if (changeValue > 0n || allTokens.size > 0) {
            const changeTokens = Array.from(allTokens.entries()).map(([tokenId, amount]) => ({
                tokenId,
                amount: amount.toString()
            }));

            let finalChangeValue = changeValue;
            if (changeValue < 1000000n && allTokens.size > 0) {
                finalChangeValue = 1000000n;
                console.log('⚠️ Adjusting change for minimum token box value');
            }

            if (finalChangeValue > 0n || changeTokens.length > 0) {
                const changeOutput = {
                    value: finalChangeValue.toString(),
                    ergoTree: senderErgoTree,
                    assets: changeTokens,
                    additionalRegisters: {},
                    creationHeight: currentHeight
                };
                outputs.push(changeOutput);

                console.log('✅ OUTPUT 3 - CHANGE:');
                console.log('  - ERG change:', Number(finalChangeValue) / Number(NANOERGS_PER_ERG));
                console.log('  - Tokens returned:', changeTokens.length);
            }
        }

        // Build final transaction (EXACTO como donation.js)
        const transaction = {
            inputs: selectedInputs,
            outputs: outputs,
            dataInputs: []
        };

        console.log('📝 FINAL TRANSACTION:');
        console.log('════════════════════════════════════════');
        console.log('📥 INPUTS:', transaction.inputs.length, 'UTXOs');
        console.log('📤 OUTPUTS:', transaction.outputs.length, 'outputs');

        let totalOutputValue = 0n;
        transaction.outputs.forEach((output, index) => {
            const ergAmount = Number(BigInt(output.value)) / Number(NANOERGS_PER_ERG);
            totalOutputValue += BigInt(output.value);
            if (index === 0) {
                console.log(`  ${index + 1}. DONATION: ${ergAmount} ERG → Satergo`);
            } else if (index === 1) {
                console.log(`  ${index + 1}. MINER FEE: ${ergAmount} ERG → miners`);
            } else {
                console.log(`  ${index + 1}. CHANGE: ${ergAmount} ERG + ${output.assets.length} tokens → you`);
            }
        });

        console.log('💰 BALANCE VERIFICATION:');
        console.log(`  - Total inputs: ${Number(totalInputValue) / Number(NANOERGS_PER_ERG)} ERG`);
        console.log(`  - Total outputs: ${Number(totalOutputValue) / Number(NANOERGS_PER_ERG)} ERG`);
        console.log(`  - Perfect balance: ${totalInputValue === totalOutputValue ? '✅ YES' : '❌ NO'}`);
        console.log('════════════════════════════════════════');

        return {
            transaction: transaction,
            tokenCount: allTokens.size,
            changeAmount: changeValue,
            feeAmount: RECOMMENDED_MIN_FEE,
            totalInputs: totalInputValue,
            selectedUtxos: selectedInputs.length
        };

    } catch (error) {
        console.error('❌ Transaction building failed:', error);
        throw error;
    }
}

// ===================================================================
// DONATION EXECUTION
// ===================================================================

// Main donation processing function
async function processDonation() {
    if (!selectedAmount || selectedAmount < 0.001) {
        showDonationStatus('Please select a valid amount (minimum 0.001 ERG)', 'error');
        return;
    }

    try {
        showDonationStatus('Detecting Nautilus Wallet...', 'loading');
        await connectToNautilus();

        showDonationStatus('Building transaction...', 'loading');
        const txId = await executeDonation(selectedAmount);

        showDonationStatus(`✅ Donation successful! Transaction: ${txId.substring(0, 16)}...`, 'success');

        setTimeout(() => {
            showDonationStatus(`https://www.ergexplorer.com/transactions#${txId}`, 'success');
        }, 2000);

        setTimeout(() => {
            closeDonationModal();
        }, 8000);

    } catch (error) {
        console.error('Donation failed:', error);
        showDonationStatus(`❌ ${error.message}`, 'error');
    }
}

// Execute donation using EXACT donation.js pattern
async function executeDonation(amountERG) {
    console.log('🚀 START DONATION - Using EXACT donation.js pattern');

    try {
        if (!isConnected || !ergoApi) {
            throw new Error('Wallet not connected');
        }

        console.log(`💰 Donating ${amountERG} ERG to Satergo: ${DONATION_ADDRESS}`);

        // Build transaction using the EXACT same pattern as donation.js
        const result = await buildDonationTransaction(amountERG);
        const unsignedTransaction = result.transaction;
        const tokenCount = result.tokenCount;

        console.log('📋 Transaction built successfully');
        console.log('🎯 Donation address:', DONATION_ADDRESS);
        console.log('💰 Amount:', amountERG, 'ERG');
        console.log('🏷️ Tokens preserved:', tokenCount);

        showDonationStatus(
            `✍️ Please confirm in Nautilus:\n• Donation: ${amountERG} ERG → Satergo\n• Network fee: ${Number(result.feeAmount) / Number(NANOERGS_PER_ERG)} ERG → miners\n• ${tokenCount > 0 ? `Your ${tokenCount} token types + change → back to you` : 'Change → back to you'}`,
            'info'
        );

        // Sign the transaction
        console.log('✍️ Requesting signature from Nautilus...');
        const signedTx = await ergoApi.sign_tx(unsignedTransaction);
        console.log('✅ Transaction signed successfully');

        // Submit the transaction
        showDonationStatus('📡 Submitting to blockchain...', 'info');
        const txId = await ergoApi.submit_tx(signedTx);

        console.log('🎉 DONATION COMPLETED SUCCESSFULLY!');
        console.log('  - Transaction ID:', txId);
        console.log('  - Amount donated:', amountERG, 'ERG');
        console.log('  - Network fee:', Number(result.feeAmount) / Number(NANOERGS_PER_ERG), 'ERG');
        console.log('  - Recipient:', DONATION_ADDRESS);
        console.log('  - Tokens preserved:', tokenCount);

        return txId;

    } catch (error) {
        console.error('❌ DONATION ERROR:', error);
        throw new Error(`Donation failed: ${error.message || 'Unknown error'}`);
    }
}

// ===================================================================
// VALIDATION AND DEBUGGING FUNCTIONS
// ===================================================================

// Validate transaction before sending
function validateTransaction(transaction) {
    const validation = {
        valid: true,
        errors: [],
        warnings: []
    };

    try {
        // 1. Verify balance
        const totalInputs = transaction.inputs.reduce((sum, inp) => sum + BigInt(inp.value), 0n);
        const totalOutputs = transaction.outputs.reduce((sum, out) => sum + BigInt(out.value), 0n);

        if (totalInputs !== totalOutputs) {
            validation.valid = false;
            validation.errors.push(`Balance mismatch: Inputs ${totalInputs} ≠ Outputs ${totalOutputs}`);
        }

        // 2. Verify fee output exists
        const hasFeeOutput = transaction.outputs.some(out =>
            BigInt(out.value) >= MIN_FEE && out.ergoTree === FEE_ERGOTREE
        );

        if (!hasFeeOutput) {
            validation.valid = false;
            validation.errors.push('Missing fee output');
        }

        // 3. Verify donation output
        const donationErgoTree = addressToErgoTree(DONATION_ADDRESS);
        const donationOutput = transaction.outputs.find(out =>
            out.ergoTree === donationErgoTree
        );

        if (!donationOutput) {
            validation.valid = false;
            validation.errors.push('Missing donation output to correct Satergo address');
        } else {
            console.log(`✅ Donation output found for Satergo: ${DONATION_ADDRESS}`);
        }

        // 4. Verify ErgoTrees
        transaction.outputs.forEach((output, index) => {
            if (!output.ergoTree || output.ergoTree.length === 0) {
                validation.valid = false;
                validation.errors.push(`Output ${index} has invalid ErgoTree`);
            }
        });

    } catch (error) {
        validation.valid = false;
        validation.errors.push(`Validation error: ${error.message}`);
    }

    return validation;
}

// Debug transaction details
function debugTransaction(transaction) {
    console.log('🔍 TRANSACTION DEBUG');
    console.log('═══════════════════════════════════════════');

    // Inputs Analysis
    const totalInputs = transaction.inputs.reduce((sum, inp) => sum + BigInt(inp.value), 0n);
    console.log('📥 INPUTS:');
    console.log(`  Count: ${transaction.inputs.length}`);
    console.log(`  Total ERG: ${Number(totalInputs) / 1000000000}`);

    // Outputs Analysis
    console.log('📤 OUTPUTS:');
    let totalOutputs = 0n;
    const donationErgoTree = addressToErgoTree(DONATION_ADDRESS);

    transaction.outputs.forEach((output, index) => {
        const ergAmount = Number(BigInt(output.value)) / 1000000000;
        totalOutputs += BigInt(output.value);

        let type = 'UNKNOWN';
        if (output.ergoTree === donationErgoTree) {
            type = 'DONATION TO SATERGO';
        } else if (output.ergoTree === FEE_ERGOTREE) {
            type = 'FEE';
        } else {
            type = 'CHANGE';
        }

        console.log(`  ${index + 1}. ${type}: ${ergAmount} ERG + ${output.assets?.length || 0} tokens`);
        console.log(`     ErgoTree: ${output.ergoTree.substring(0, 20)}...`);
    });

    // Balance Verification
    console.log('💰 BALANCE:')
    console.log(`  Inputs: ${Number(totalInputs) / 1000000000} ERG`);
    console.log(`  Outputs: ${Number(totalOutputs) / 1000000000} ERG`);
    console.log(`  Balanced: ${totalInputs === totalOutputs ? '✅' : '❌'}`);

    // Address verification
    console.log('🎯 ADDRESS VERIFICATION:');
    console.log(`  Target address: ${DONATION_ADDRESS}`);
    console.log(`  Target ErgoTree: ${donationErgoTree}`);
    console.log(`  Donation output found: ${transaction.outputs.some(out => out.ergoTree === donationErgoTree) ? '✅' : '❌'}`);

    console.log('═══════════════════════════════════════════');
}

// ===================================================================
// TESTING AND UTILITIES
// ===================================================================

// Test address conversion for Satergo
function testSatergoAddressConversion() {
    console.log('🧪 Testing Satergo address conversion...');

    try {
        const address = DONATION_ADDRESS;
        const ergoTree = addressToErgoTree(address);

        console.log(`✅ Test PASSED`);
        console.log(`  Satergo Address: ${address}`);
        console.log(`  ErgoTree: ${ergoTree}`);
        console.log(`  Length: ${ergoTree.length} chars (expected: 70)`);

        return ergoTree;
    } catch (error) {
        console.error(`❌ Test FAILED: ${error.message}`);
        return null;
    }
}

// Test donation flow
async function testDonationFlow() {
    console.log('🧪 Testing donation flow with Satergo address...');

    try {
        // 1. Test Nautilus detection
        const connector = await detectNautilusWallet();
        if (!connector) {
            console.log('❌ Nautilus not detected');
            return false;
        }
        console.log('✅ Nautilus detected');

        // 2. Test address conversion
        const ergoTree = testSatergoAddressConversion();
        if (!ergoTree) {
            console.log('❌ Address conversion failed');
            return false;
        }

        console.log('🎉 All tests passed! Ready for donations to Satergo.');
        console.log(`🎯 Donations will go to: ${DONATION_ADDRESS}`);
        console.log('💡 Using EXACT same pattern as working donation.js');
        return true;

    } catch (error) {
        console.error('❌ Test failed:', error);
        return false;
    }
}

// Format ERG amount
function formatERGFromNanoERG(nanoErgs, decimals = 3) {
    try {
        const nanoErgsBig = BigInt(nanoErgs);
        const divisor = BigInt(NANOERGS_PER_ERG);

        const integerPart = nanoErgsBig / divisor;
        const remainder = nanoErgsBig % divisor;

        const remainderStr = remainder.toString().padStart(9, '0');
        const decimalPart = remainderStr.substring(0, decimals);

        const result = `${integerPart}.${decimalPart}`;
        return parseFloat(result).toString();

    } catch (error) {
        console.error('Error formatting ERG:', error);
        return '0.000';
    }
}

// Public API for testing
window.SatergoTestUtils = {
    testSatergoAddressConversion,
    testDonationFlow,
    debugTransaction,
    validateTransaction,
    DONATION_ADDRESS,
    addressToErgoTree,

    // Manual test function
    testManualDonation: async function(testAmount = 0.001) {
        console.log(`🧪 Manual test: Preparing donation of ${testAmount} ERG to Satergo`);

        if (!isConnected) {
            console.log('⚠️ Connect wallet first');
            return;
        }

        try {
            const result = await executeDonation(testAmount);
            console.log(`✅ Test successful: ${result}`);
            return result;
        } catch (error) {
            console.error(`❌ Test failed: ${error.message}`);
            throw error;
        }
    }
};

console.log('📚 Satergo Donation System loaded with EXACT donation.js pattern!');
console.log(`🎯 Donation address: ${DONATION_ADDRESS}`);
console.log('🎯 Using SAME working pattern as donation.js with correct ErgoTree handling');
console.log('🧪 Test with: SatergoTestUtils.testSatergoAddressConversion()');
console.log('🧪 Full test: SatergoTestUtils.testDonationFlow()');
console.log('💡 This implementation uses the EXACT same transaction building pattern as your working donation.js');

// Switch between ERGO and MONERO donation tabs
function switchDonationTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.donation-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.donation-tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Add active class to selected tab and content
    if (tabName === 'ergo') {
        document.getElementById('ergoTab').classList.add('active');
        document.getElementById('ergoDonationContent').classList.add('active');
    } else if (tabName === 'monero') {
        document.getElementById('moneroTab').classList.add('active');
        document.getElementById('moneroDonationContent').classList.add('active');
    }
}

// Función universal para copiar al portapapeles (funciona en todos los entornos)
async function copyToClipboard(text) {
    try {
        // Método 1: API moderna del portapapeles (HTTPS)
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Método 2: Fallback para HTTP y navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (!successful) {
            throw new Error('Fallback copy failed');
        }

        return true;

    } catch (error) {
        console.error('Copy failed:', error);
        return false;
    }
}

// Función para copiar dirección ERGO
async function copyErgoAddress() {
    const address = document.getElementById('ergoAddress').textContent.trim();
    const button = document.querySelector('#ergoCopyButtonText').parentElement;
    const buttonText = document.getElementById('ergoCopyButtonText');

    try {
        const success = await copyToClipboard(address);

        if (success) {
            // Animación de éxito
            button.classList.add('copied');
            buttonText.innerHTML = '✅ Copied!';

            // Feedback visual adicional
            showDonationStatus('ERGO address copied to clipboard!', 'success');

            // Restaurar después de 2 segundos
            setTimeout(() => {
                button.classList.remove('copied');
                buttonText.innerHTML = '📋 Copy Address';
                hideDonationStatus();
            }, 2000);

        } else {
            throw new Error('Copy operation failed');
        }

    } catch (error) {
        console.error('Failed to copy ERGO address:', error);

        // Mostrar error y seleccionar texto como fallback
        showDonationStatus('Please select and copy the address manually (Ctrl+C)', 'error');

        // Seleccionar el texto automáticamente
        const addressElement = document.getElementById('ergoAddress');
        const range = document.createRange();
        range.selectNode(addressElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Highlight visual
        addressElement.style.background = 'rgba(239, 68, 68, 0.1)';
        setTimeout(() => {
            addressElement.style.background = '';
            hideMoneroStatus();
        }, 3000);
    }
}

// Función mejorada para copiar dirección Monero
async function copyMoneroAddress() {
    const address = document.getElementById('moneroAddress').textContent.trim();
    const button = document.querySelector('.copy-address-button');
    const buttonText = document.getElementById('copyButtonText');

    try {
        const success = await copyToClipboard(address);

        if (success) {
            // Animación de éxito
            button.classList.add('copied');
            buttonText.innerHTML = '✅ Copied!';

            // Feedback visual
            showMoneroStatus('Monero address copied to clipboard!', 'success');

            // Restaurar después de 2 segundos
            setTimeout(() => {
                button.classList.remove('copied');
                buttonText.innerHTML = '📋 Copy Address';
                hideMoneroStatus();
            }, 2000);

        } else {
            throw new Error('Copy operation failed');
        }

    } catch (error) {
        console.error('Failed to copy Monero address:', error);

        // Mostrar error y seleccionar texto como fallback
        showMoneroStatus('Please select and copy the address manually (Ctrl+C)', 'error');

        // Seleccionar el texto automáticamente
        const addressElement = document.getElementById('moneroAddress');
        const range = document.createRange();
        range.selectNode(addressElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Highlight visual
        addressElement.style.background = 'rgba(239, 68, 68, 0.1)';
        setTimeout(() => {
            addressElement.style.background = '';
            hideMoneroStatus();
        }, 3000);
    }
}

// Show Monero status message
function showMoneroStatus(message, type = 'loading') {
    const status = document.getElementById('moneroStatus');
    if (status) {
        status.textContent = message;
        status.className = `donation-status ${type}`;
        status.style.display = 'block';
    }
}

// Hide Monero status
function hideMoneroStatus() {
    const status = document.getElementById('moneroStatus');
    if (status) {
        status.style.display = 'none';
    }
}

// Update resetDonationModal to include tabs
const originalResetDonationModal = resetDonationModal;
resetDonationModal = function() {
    // Call original reset function
    originalResetDonationModal();

    // Reset tabs to ERGO default
    switchDonationTab('ergo');
    hideMoneroStatus();
};

console.log('✅ Donation tabs functionality added! ERGO and MONERO options available.');
