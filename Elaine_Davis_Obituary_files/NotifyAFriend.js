function NotifyAFriendObit(params) {
    //Public Variables
    var NotifyAFriendPanel = params.NotifyAFriendPanel;
    var FormPanel = params.FormPanel;
    var SuccessPanel = params.SuccessPanel;
    var FailurePanel = params.FailurePanel;
    var FromEmail = params.FromEmail;
    var ToEmail = params.ToEmail;
    var Message = params.Message;
    var EmailOptIn = params.EmailOptIn;
    var SendButton = params.SendButton;
    var webServiceUrl = params.WebServiceUrl;

    OnInit();
    NotifyAFriendPanel.dialog({ draggable: false, modal: true, autoOpen: false, width: 445 });

    this.start = function () {
        OnOpen();
        NotifyAFriendPanel.dialog("open");
    }

    SendButton.click(function (e) {
        if (ValidateFormData()) {
            SendNotifyAFriendEmail().done(function (result) {
                if (result.indexOf('<li>') < 0) {
                    FormPanel.hide();
                    FormCleanUp();
                    SuccessPanel.show();
                    try {
                        if (typeof (acxm_match) === "function" && result !== "") {
                            acxm_match(result);
                        }
                    } catch (e) { }
                }
                else {
                    FormPanel.hide();
                    FailurePanel.show();
                    try { console.log("Error occured: " + result); } catch (e) { }
                }
            });
        }

        e.preventDefault();
    });

    //Methods
    function OnInit() {
        FormPanel.css("height", "auto");
    }

    function OnOpen() {
        FailurePanel.hide();
        SuccessPanel.hide();
        FormPanel.show();
    }

    function OnClose() {
        FailurePanel.hide();
        SuccessPanel.hide();
        FormPanel.hide();
        FormCleanUp();
    }

    function validEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function ValidateFormData() {
        var isValid = true;
        var emails = ToEmail.val().split(',');
        for (var i = 0; i < emails.length; i++) {
            if (!validEmail(emails[i])) {
                NotifyAFriendPanel.find('#ToEmailError').show();
                isValid = false;
            }
        }
        if (isValid) {
            NotifyAFriendPanel.find('#ToEmailError').hide();
        }
        if (!validEmail(FromEmail.val())) {
            NotifyAFriendPanel.find('#FromEmailError').show();
            isValid = false;
        } else {
            NotifyAFriendPanel.find('#FromEmailError').hide();
        }
        return isValid;
    }

    function FormCleanUp() {
        FromEmail.val("");
        FromEmail.blur();
        ToEmail.val("");
        ToEmail.blur();
        Message.val("");
        EmailOptIn.attr("checked", false);
        NotifyAFriendPanel.find('#FromEmailError').hide();
        NotifyAFriendPanel.find('#ToEmailError').hide();
    }

    function SendNotifyAFriendEmail() {
        var r = Math.random();
        var q = "&emailTo=" + encodeURI(ToEmail.val()) + "&emailFrom=" + encodeURI(FromEmail.val()) + "&message=" + encodeURI(Message.val()) + "&optIn=" + encodeURI(EmailOptIn.is(":checked")) + "&rand=" + r;
        return $.ajax({
            url: webServiceUrl + q,
            type: "GET",
            dataType: "json",
            error: function (error, er1, er2) {
                try { console.log("error sending email!"); } catch (e) { }
            }
        });
    }

    $(document).ready(function() {
        FormPanel.find('textarea').keyup(function () {
            var limit = parseInt($(this).attr('maxlength'));
            var text = $(this).val();
            var chars = text.length;
            if (chars > limit) {
                var newText = text.substr(0, limit);
                $(this).val(newText);
            }
        });
        FromEmail.watermark({ watermarkText: 'Your email address' });
        ToEmail.watermark({ watermarkText: 'Separate multiple emails with a comma' });
        NotifyAFriendPanel.find(".CloseModal").click(function () { OnClose(); NotifyAFriendPanel.dialog("close"); });
        NotifyAFriendPanel.find(".ReturnToForm").click(function () {
            FailurePanel.hide();
            SuccessPanel.hide();
            FormPanel.show();
        });
    });
}