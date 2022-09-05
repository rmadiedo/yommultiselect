function toggleSelect(id) {
    document.querySelectorAll(".multi-selection-wrapper").forEach(element => {
        const forId = element.id.substring(1);
        if (forId == id) {
            if (element.classList.contains("multi-selection-hidden"))
                element.classList.remove("multi-selection-hidden");
            else
                element.classList.add("multi-selection-hidden");
            return;
        }
    });
}
function createHtmlElement(tag, classNames, divId) {
    const newElement = document.createElement(tag);
    classNames.forEach(className => {
        newElement.classList.add(className);
    });
    if (divId !== undefined && divId != "") {
        newElement.setAttribute("id", divId);
    }
    return newElement;
}

function createMultiSelectElement(id, caption) {
    const newSelectElement = createHtmlElement("div", ["form-control"], id);
    const captionNode = document.createTextNode(caption);
    const svgIcon = createHtmlElement("svg", ["bi", "bi-chevron-down"]);

    svgIcon.setAttribute("width", "12");
    svgIcon.setAttribute("height", "12");
    svgIcon.setAttribute("fill", "currentColor");
    svgIcon.setAttributeNS(null, "viewBox", "0 0 12 12");
    svgIcon.setAttribute("stroke", "#000");
    svgIcon.setAttribute("stroke-width", "1");
    const svgPath = createHtmlElement("path", []);
    svgPath.setAttribute("fill-rule", "evenodd");
    svgPath.setAttribute("d", "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
    svgIcon.appendChild(svgPath);
    const spanIcon = createHtmlElement("span", []);
    spanIcon.setAttribute("style", "float: right;");
    spanIcon.appendChild(svgIcon);
    newSelectElement.appendChild(captionNode);
    newSelectElement.appendChild(spanIcon);

    return newSelectElement;
}

function createSection(sectionCaption) {
    const section = createHtmlElement("div", ["multi-selection-section"]);
    const caption = createHtmlElement("span", ["multi-selection-section-header"]);
    const captionText = document.createTextNode(sectionCaption);
    caption.appendChild(captionText);
    section.appendChild(caption);
    return section;
}

function createCheckbox(value, isChecked) {
    const input = createHtmlElement("input", ["form-check-input"], value);
    input.setAttribute("type", "checkbox");
    if (isChecked)
        input.setAttribute("checked", "true");
    return input;
}

function createCheckboxLabel(text, value) {
    const label = createHtmlElement("label", ["form-check-label", "multi-selection-label"]);
    label.setAttribute("for", value);
    const labelText = document.createTextNode(text);
    label.appendChild(labelText);
    return label;
}

function traverseOptions(selectElement, id) {
    const wrapper = createHtmlElement("div", ["multi-selection-wrapper"], `w${id}`);
    const sections = [];
    let currentSection;

    for (let i = 0; i < selectElement.options.length; i++) {
        const sectionName = selectElement.options[i].getAttribute("data-section");
        const optionValue = selectElement.options[i].value;
        const textNode = selectElement.options[i].text;
        const isChecked = selectElement.options[i].selected;
        if (sectionName !== undefined && sectionName !== "") {
            if (!sections.includes(sectionName)) {
                sections.push(sectionName);
                if (currentSection !== undefined) {
                    wrapper.appendChild(currentSection);
                }
                currentSection = createSection(sectionName);
            }
            const checkBox = createCheckbox(optionValue, isChecked);
            const checkLabel = createCheckboxLabel(textNode, optionValue);
            const nextLine = createHtmlElement("br", []);
            currentSection.appendChild(checkBox);
            currentSection.appendChild(checkLabel);
            currentSection.appendChild(nextLine);
        }
        wrapper.appendChild(currentSection);
    }
    return wrapper;
}

function multipleSelect (id) {
    const select = document.getElementById(id);
    const parent = select.parentNode;
    const multiSelect = createMultiSelectElement(id, "Select");
    const options = traverseOptions(select, id);

    multiSelect.addEventListener("click", function() {
        toggleSelect(id);
    });
    //options.classList.add("multi-selection-hidden");
    parent.removeChild(select);
    parent.appendChild(multiSelect);
    parent.appendChild(options);
}