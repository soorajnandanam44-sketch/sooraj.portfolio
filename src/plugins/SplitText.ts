export interface SplitTextVars {
  type?: string; // "chars", "words", "lines", or combinations like "chars,lines"
  linesClass?: string;
  wordsClass?: string;
  charsClass?: string;
  tag?: string;
  reduceWhiteSpace?: boolean;
}

export class SplitText {
  elements: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  isSplit: boolean = false;
  vars: SplitTextVars;
  private _originals: { el: HTMLElement; html: string }[] = [];

  static register() {
    // GSAP plugin registration compatible stub
  }

  static create(target: any, vars?: SplitTextVars) {
    return new SplitText(target, vars);
  }

  constructor(target: any, vars?: SplitTextVars) {
    this.vars = vars || {};

    if (typeof target === "string") {
      this.elements = Array.from(document.querySelectorAll<HTMLElement>(target));
    } else if (Array.isArray(target)) {
      target.forEach((t) => {
        if (typeof t === "string") {
          this.elements.push(...Array.from(document.querySelectorAll<HTMLElement>(t)));
        } else if (t instanceof HTMLElement) {
          this.elements.push(t);
        }
      });
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else if (target && typeof target[Symbol.iterator] === "function") {
      this.elements = Array.from(target);
    }

    this.split(this.vars);
  }

  split(vars?: SplitTextVars) {
    if (this.isSplit) {
      this.revert();
    }
    this.vars = vars || this.vars;
    const type = this.vars.type || "chars,words,lines";
    const hasChars = type.includes("chars");
    const hasWords = type.includes("words");
    const hasLines = type.includes("lines");
    const linesClass = this.vars.linesClass || "split-line";
    const wordsClass = this.vars.wordsClass || "split-word";
    const charsClass = this.vars.charsClass || "split-char";

    this.chars = [];
    this.words = [];
    this.lines = [];
    this._originals = [];

    this.elements.forEach((el) => {
      this._originals.push({ el, html: el.innerHTML });
      const rawText = el.textContent || "";
      el.innerHTML = "";

      const wordNodes: { wordEl: HTMLElement; chars: HTMLElement[] }[] = [];
      const tokens = rawText.trim().split(/\s+/);

      const tempFrag = document.createDocumentFragment();

      tokens.forEach((token, idx) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = wordsClass;
        wordSpan.style.display = "inline-block";
        wordSpan.style.position = "relative";
        wordSpan.style.whiteSpace = "nowrap";

        const tokenChars: HTMLElement[] = [];
        if (hasChars) {
          for (let i = 0; i < token.length; i++) {
            const charSpan = document.createElement("span");
            charSpan.className = charsClass;
            charSpan.style.display = "inline-block";
            charSpan.style.position = "relative";
            charSpan.textContent = token[i];
            tokenChars.push(charSpan);
            wordSpan.appendChild(charSpan);
          }
        } else {
          wordSpan.textContent = token;
        }

        tempFrag.appendChild(wordSpan);
        if (idx < tokens.length - 1) {
          tempFrag.appendChild(document.createTextNode(" "));
        }

        wordNodes.push({
          wordEl: wordSpan,
          chars: tokenChars,
        });
      });

      el.appendChild(tempFrag);

      if (hasLines && wordNodes.length > 0) {
        const lineGroups: { words: { wordEl: HTMLElement; chars: HTMLElement[] }[] }[] = [];
        let currentLine: { words: { wordEl: HTMLElement; chars: HTMLElement[] }[] } = { words: [] };
        let lastTop = -1;

        wordNodes.forEach((node) => {
          const top = node.wordEl.offsetTop;
          if (lastTop === -1 || Math.abs(top - lastTop) < 6) {
            currentLine.words.push(node);
          } else {
            lineGroups.push(currentLine);
            currentLine = { words: [node] };
          }
          lastTop = top;
        });
        if (currentLine.words.length > 0) {
          lineGroups.push(currentLine);
        }

        el.innerHTML = "";
        lineGroups.forEach((group) => {
          const lineDiv = document.createElement("div");
          lineDiv.className = linesClass;
          this.lines.push(lineDiv);

          group.words.forEach((node, wIdx) => {
            lineDiv.appendChild(node.wordEl);
            if (wIdx < group.words.length - 1) {
              lineDiv.appendChild(document.createTextNode(" "));
            }
            if (hasWords) {
              this.words.push(node.wordEl);
            }
            if (hasChars) {
              this.chars.push(...node.chars);
            }
          });
          el.appendChild(lineDiv);
        });
      } else {
        wordNodes.forEach((node) => {
          if (hasWords) this.words.push(node.wordEl);
          if (hasChars) this.chars.push(...node.chars);
        });
      }
    });

    this.isSplit = true;
    return this;
  }

  revert() {
    this._originals.forEach(({ el, html }) => {
      el.innerHTML = html;
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.isSplit = false;
  }
}

export default SplitText;
