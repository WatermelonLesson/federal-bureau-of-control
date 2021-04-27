'use strict';

let test_roster = new Array();

function formHandler(event) {
    event.preventDefault();

    let currentPage = document.querySelector("fieldset.visible-page");

    if (currentPage.nextElementSibling.tagName === "FIELDSET" && currentPage.nextElementSibling.classList.contains("form-page-disabled") === false)
    {
        /* -- Make the next section of the form visible. -- */

        currentPage.classList.remove("visible-page");
        currentPage.nextElementSibling.classList.add("visible-page");

        /* -- 
                If this is the last section (i.e., the element after the newly visible page is not a fieldset or
                the next fieldset shows when we disable the form), update the copy on the submission button to 
                indicate this.
                                                                                                                    -- */

        if (currentPage.nextElementSibling.nextElementSibling.classList.contains("form-page-disabled") || currentPage.nextElementSibling.nextElementSibling.tagName !== "FIELDSET")
        {
            event.target.value = "Finish";
        }

        /* --
                Here we begin collecting the information that the user submits. I prefer to use a switch rather than an
                if because it provides a cleaner presentation and offers more flexibility and easier maintenace. 
                                                                                                                        -- */

        switch (currentPage.id) {
            case "form-page-one": {
                console.log("User has completed page one.");

                if (document.querySelector("select#work-authorization").selectedOptions[0].value === "negative" || document.querySelector("select#selective-service").selectedOptions[0].value === "negative"
                    || document.querySelector("select#consumption").selectedOptions[0].value === "affirmative" || document.querySelector("select#convictions").selectedOptions[0].value === "affirmative") {
                        console.log("Invalid participant. Ending employment form.");
                        document.querySelector("fieldset.visible-page").classList.remove("visible-page");
                        document.querySelector("fieldset#form-page-ineligible").classList.add("visible-page");
                        document.querySelector("input[type=submit]").setAttribute("disabled", "");
                    }
                break;
            }
            case "form-page-two": {
                console.log("User has completed page two.");

                /* -- 
                        We will determine which test to offer based on user response. The sector priority is:
                            1. Investigations
                            2. Research
                            3. Containment
                            4. Maintenance (No available openings...)
                            5. Executive (No available openings...)
                                                                                                                -- */

                let education_level = document.querySelector("select#education-level").selectedOptions[0].value;
                let education_field = document.querySelector("select#education-field").selectedOptions[0].value;
                let previous_employment = document.querySelector("select#previous-employment").selectedOptions[0].value;
                let combat_experience = document.querySelector("select#combat-experience").selectedOptions[0].value;

                if (combat_experience === "affirmative")
                {
                    test_roster.push(0);
                }

                if (previous_employment === "affirmative")
                {
                    test_roster.push(1);
                }

                switch (education_field)
                {
                    case "biology":
                        test_roster.push(2);
                        break;
                    case "chemistry":
                        test_roster.push(3);
                        break;
                    case "mathematics":
                        test_roster.push(4);
                        break;
                    case "physics":
                        test_roster.push(5);
                        break;
                    default: 
                        break;
                }

                if (test_roster.length === 0)
                {
                    document.querySelector("fieldset.visible-page").classList.remove("visible-page");
                    document.querySelector("fieldset#form-page-ineligible").classList.add("visible-page");
                    document.querySelector("input[type=submit]").setAttribute("disabled", "");
                }

                for (var i = 0; i < test_roster.length; i++)
                {
                    if ((test_roster[i] >= 2 && test_roster[i] <= 5) && education_level === "high-school")
                    {
                        console.log("LYING IS STRICTLY PROHIBITED.");
                        console.log("TEST FAILED.");

                        document.querySelector("fieldset.visible-page").classList.remove("visible-page");
                        document.querySelector("fieldset#form-page-ineligible").classList.add("visible-page");
                        document.querySelector("input[type=submit]").setAttribute("disabled", "");
                    }
                }

                console.log(test_roster);
                break;
            }
            case "form-page-three": {
                console.log("User has completed page three.");

                break;
            }
            default: {
                break;
            }
        }
    }
    else
    {
        /* -- End of Form -- */
        console.log("You have reached the end of the form.");
    }
}

document.querySelector("input[type=submit]").addEventListener("click", formHandler);

document.querySelectorAll("button#begin-employment-test").forEach(element => {
    element.addEventListener("click", function (event) {
        event.preventDefault();

        document.querySelector("main").classList.add("hidden");
        document.querySelector("form").classList.remove("unavailable-form");
    });
});