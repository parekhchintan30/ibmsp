  /// Authentication setup ///
    qz.security.setCertificatePromise(function(resolve, reject) {
        //Preferred method - from server
//        $.ajax("assets/signing/digital-certificate.txt").then(resolve, reject);

        //Alternate method 1 - anonymous
//        resolve();

        //Alternate method 2 - direct
        resolve("-----BEGIN CERTIFICATE-----\n" +
                "MIIFAzCCAuugAwIBAgICEAIwDQYJKoZIhvcNAQEFBQAwgZgxCzAJBgNVBAYTAlVT\n" +
                "MQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0cmllcywgTExDMRswGQYD\n" +
                "VQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMMEHF6aW5kdXN0cmllcy5j\n" +
                "b20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1c3RyaWVzLmNvbTAeFw0x\n" +
                "NTAzMTkwMjM4NDVaFw0yNTAzMTkwMjM4NDVaMHMxCzAJBgNVBAYTAkFBMRMwEQYD\n" +
                "VQQIDApTb21lIFN0YXRlMQ0wCwYDVQQKDAREZW1vMQ0wCwYDVQQLDAREZW1vMRIw\n" +
                "EAYDVQQDDAlsb2NhbGhvc3QxHTAbBgkqhkiG9w0BCQEWDnJvb3RAbG9jYWxob3N0\n" +
                "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtFzbBDRTDHHmlSVQLqjY\n" +
                "aoGax7ql3XgRGdhZlNEJPZDs5482ty34J4sI2ZK2yC8YkZ/x+WCSveUgDQIVJ8oK\n" +
                "D4jtAPxqHnfSr9RAbvB1GQoiYLxhfxEp/+zfB9dBKDTRZR2nJm/mMsavY2DnSzLp\n" +
                "t7PJOjt3BdtISRtGMRsWmRHRfy882msBxsYug22odnT1OdaJQ54bWJT5iJnceBV2\n" +
                "1oOqWSg5hU1MupZRxxHbzI61EpTLlxXJQ7YNSwwiDzjaxGrufxc4eZnzGQ1A8h1u\n" +
                "jTaG84S1MWvG7BfcPLW+sya+PkrQWMOCIgXrQnAsUgqQrgxQ8Ocq3G4X9UvBy5VR\n" +
                "CwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdl\n" +
                "bmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUpG420UhvfwAFMr+8vf3pJunQ\n" +
                "gH4wHwYDVR0jBBgwFoAUkKZQt4TUuepf8gWEE3hF6Kl1VFwwDQYJKoZIhvcNAQEF\n" +
                "BQADggIBAFXr6G1g7yYVHg6uGfh1nK2jhpKBAOA+OtZQLNHYlBgoAuRRNWdE9/v4\n" +
                "J/3Jeid2DAyihm2j92qsQJXkyxBgdTLG+ncILlRElXvG7IrOh3tq/TttdzLcMjaR\n" +
                "8w/AkVDLNL0z35shNXih2F9JlbNRGqbVhC7qZl+V1BITfx6mGc4ayke7C9Hm57X0\n" +
                "ak/NerAC/QXNs/bF17b+zsUt2ja5NVS8dDSC4JAkM1dD64Y26leYbPybB+FgOxFu\n" +
                "wou9gFxzwbdGLCGboi0lNLjEysHJBi90KjPUETbzMmoilHNJXw7egIo8yS5eq8RH\n" +
                "i2lS0GsQjYFMvplNVMATDXUPm9MKpCbZ7IlJ5eekhWqvErddcHbzCuUBkDZ7wX/j\n" +
                "unk/3DyXdTsSGuZk3/fLEsc4/YTujpAjVXiA1LCooQJ7SmNOpUa66TPz9O7Ufkng\n" +
                "+CoTSACmnlHdP7U9WLr5TYnmL9eoHwtb0hwENe1oFC5zClJoSX/7DRexSJfB7YBf\n" +
                "vn6JA2xy4C6PqximyCPisErNp85GUcZfo33Np1aywFv9H+a83rSUcV6kpE/jAZio\n" +
                "5qLpgIOisArj1HTM6goDWzKhLiR/AeG3IJvgbpr9Gr7uZmfFyQzUjvkJ9cybZRd+\n" +
                "G8azmpBBotmKsbtbAU/I/LVk8saeXznshOVVpDRYtVnjZeAneso7\n" +
                "-----END CERTIFICATE-----\n" +
                "--START INTERMEDIATE CERT--\n" +
                "-----BEGIN CERTIFICATE-----\n" +
                "MIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT\n" +
                "MQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ\n" +
                "bmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG\n" +
                "A1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx\n" +
                "emluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow\n" +
                "gZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0\n" +
                "cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM\n" +
                "EHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1\n" +
                "c3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU\n" +
                "iohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H\n" +
                "YpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM\n" +
                "GAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH\n" +
                "EtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh\n" +
                "0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX\n" +
                "xOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1\n" +
                "9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE\n" +
                "ZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD\n" +
                "2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX\n" +
                "6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY\n" +
                "5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ\n" +
                "plC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S\n" +
                "BkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ\n" +
                "eUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k\n" +
                "gDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT\n" +
                "x8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu\n" +
                "pz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw\n" +
                "2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp\n" +
                "rbO7BnjW\n" +
                "-----END CERTIFICATE-----\n");
    });

    qz.security.setSignaturePromise(function(toSign) {
        return function(resolve, reject) {
            //Preferred method - from server
//            $.ajax("/secure/url/for/sign-message?request=" + toSign).then(resolve, reject);

            //Alternate method - unsigned
            resolve();
        };
    });


    /// Connection ///
    function launchQZ() {
        if (!qz.websocket.isActive()) {
            window.location.assign("qz:launch");
            //Retry 5 times, pausing 1 second between each attempt
            startConnection({ retries: 5, delay: 1 });
        }
    }

    function startConnection(config) {
        if (!qz.websocket.isActive()) {
            updateState('Waiting', 'default');

            qz.websocket.connect(config).then(function() {
                updateState('Active', 'success');
                findVersion();
            }).catch(handleConnectionError);
        } else {
            displayMessage('An active connection with QZ already exists.', 'alert-warning');
        }
    }

    function endConnection() {
        if (qz.websocket.isActive()) {
            qz.websocket.disconnect().then(function() {
                updateState('Inactive', 'default');
            }).catch(handleConnectionError);
        } else {
            displayMessage('No active connection with QZ exists.', 'alert-warning');
        }
    }

    function listNetworkInfo() {
        qz.websocket.getNetworkInfo().then(function(data) {
            if (data.macAddress == null) { data.macAddress = 'UNKNOWN'; }
            if (data.ipAddress == null) { data.ipAddress = "UNKNOWN"; }

            var macFormatted = '';
            for(var i = 0; i < data.macAddress.length; i++) {
                macFormatted += data.macAddress[i];
                if (i % 2 == 1 && i < data.macAddress.length - 1) {
                    macFormatted += ":";
                }
            }

            displayMessage("<strong>IP:</strong> " + data.ipAddress + "<br/><strong>Physical Address:</strong> " + macFormatted);
        }).catch(displayError);
    }






 
    /// Resets ///
    function resetRawOptions() {
        $("#rawPerSpool").val(1);
        $("#rawEncoding").val(null);
        $("#rawEndOfDoc").val(null);
        $("#rawAltPrinting").prop('checked', false);
        $("#rawCopies").val(1);
    }

    function resetPixelOptions() {
        $("#pxlColorType").val("color");
        $("#pxlCopies").val(1);
        $("#pxlDensity").val('');
        $("#pxlDuplex").prop('checked', false);
        $("#pxlInterpolation").val("");
        $("#pxlJobName").val("");
        $("#pxlOrientation").val("");
        $("#pxlPaperThickness").val(null);
        $("#pxlPrinterTray").val(null);
        $("#pxlRasterize").prop('checked', true);
        $("#pxlRotation").val(0);
        $("#pxlScale").prop('checked', true);
        $("#pxlUnitsIN").prop('checked', true);

        $("#pxlMargins").val(0).css('display', '');
        $("#pxlMarginsTop").val(0);
        $("#pxlMarginsRight").val(0);
        $("#pxlMarginsBottom").val(0);
        $("#pxlMarginsLeft").val(0);
        $("#pxlMarginsActive").prop('checked', false);
        $("#pxlMarginsGroup").css('display', 'none');

        $("#pxlSizeWidth").val('');
        $("#pxlSizeHeight").val('');
        $("#pxlSizeActive").prop('checked', false);
        $("#pxlSizeGroup").css('display', 'none');
    }

    function checkSizeActive() {
        if ($("#pxlSizeActive").prop('checked')) {
            $("#pxlSizeGroup").css('display', '');
        } else {
            $("#pxlSizeGroup").css('display', 'none');
        }
    }

    function checkMarginsActive() {
        if ($("#pxlMarginsActive").prop('checked')) {
            $("#pxlMarginsGroup").css('display', '');
            $("#pxlMargins").css('display', 'none');
        } else {
            $("#pxlMarginsGroup").css('display', 'none');
            $("#pxlMargins").css('display', '');
        }
    }

    function resetSerialOptions() {
        $("#serialPort").val('');
        $("#serialCmd").val('');
        $("#serialStart").val("0x0002"); //String.fromCharCode(2)
        $("#serialEnd").val("0x000D"); //String.fromCharCode(13)

        $("#serialBaud").val(9600);
        $("#serialData").val(8);
        $("#serialStop").val(1);
        $("#serialParity").val('NONE');
        $("#serialFlow").val('NONE');

        // M/T PS60 - 9600, 7, 1, EVEN, NONE
    }

    function resetUsbOptions() {
        $("#usbVendor").val('');
        $("#usbProduct").val('');

        $("#usbInterface").val('');
        $("#usbEndpoint").val('');
        $("#usbData").val('');
        $("#usbResponse").val(8);
        $("#usbStream").val(10);

        // M/T PS60 - V:0x0EB8 P:0xF000, I:0x0 E:0x81
        // Dymo S100 - V:0x0922 P:0x8009, I:0x0 E:0x82
    }

    function resetHidOptions() {
        $("#hidVendor").val('');
        $("#hidProduct").val('');

        $("#hidInterface").val('');
        $("#hidEndpoint").val('');
        $("#hidData").val('');
        $("#hidReport").val('');
        $("#hidResponse").val(8);
        $("#hidStream").val(10);
    }


    /// Page load ///
    $(document).ready(function() {
        window.readingWeight = false;

        resetRawOptions();
        resetPixelOptions();
        resetSerialOptions();
        resetUsbOptions();
        resetHidOptions();

        startConnection();

       
        

        $("[data-toggle='tooltip']").tooltip();
    });

    qz.websocket.setClosedCallbacks(function(evt) {
        updateState('Inactive', 'default');
        console.log(evt);

        if (evt.reason) {
            displayMessage("<strong>Connection closed:</strong> " + evt.reason, 'alert-warning');
        }
    });

    qz.websocket.setErrorCallbacks(handleConnectionError);

    




    var qzVersion = 0;
    function findVersion() {
        qz.api.getVersion().then(function(data) {
            $("#qz-version").html(data);
            qzVersion = data;
        }).catch(displayError);
    }



    /// Helpers ///
    function handleConnectionError(err) {
        updateState('Error', 'danger');

        if (err.target != undefined) {
            if (err.target.readyState >= 2) { //if CLOSING or CLOSED
                displayError("Connection to QZ Tray was closed");
            } else {
                displayError("A connection error occurred, check log for details");
                console.error(err);
            }
        } else {
            displayError(err);
        }
    }

    function displayError(err) {
        console.error(err);
        displayMessage(err, 'alert-danger');
    }

    function displayMessage(msg, css) {
        if (css == undefined) { css = 'alert-info'; }

        var timeout = setTimeout(function() { $('#' + timeout).alert('close'); }, 5000);

        var alert = $("<div/>").addClass('alert alert-dismissible fade in ' + css)
                .css('max-height', '20em').css('overflow', 'auto')
                .attr('id', timeout).attr('role', 'alert');
        alert.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" + msg);

        $("#qz-alert").append(alert);
    }

    function pinMessage(msg, id, css) {
        if (css == undefined) { css = 'alert-info'; }

        var alert = $("<div/>").addClass('alert alert-dismissible fade in ' + css)
                .css('max-height', '20em').css('overflow', 'auto').attr('role', 'alert')
                .html("<button type='button' class='close' data-dismiss='alert'>&times;</button>");

        var text = $("<div/>").html(msg);
        if (id != undefined) { text.attr('id', id); }

        alert.append(text);

        $("#qz-pin").append(alert);
    }

    function updateState(text, css) {
        $("#qz-status").html(text);
        $("#qz-connection").removeClass().addClass('panel panel-' + css);

        if (text === "Inactive" || text === "Error") {
            $("#launch").show();
        } else {
            $("#launch").hide();
        }
    }

    function getPath() {
        var path = window.location.href;
        return path.substring(0, path.lastIndexOf("/"));
    }

    
    /// QZ Config ///
    var cfg = null;
    function getUpdatedConfig() {
        if (cfg == null) {
            cfg = qz.configs.create(null);
        }

        updateConfig();
        return cfg
    }

    function updateConfig() {
        var pxlSize = null;
        if ($("#pxlSizeActive").prop('checked')) {
            pxlSize = {
                width: $("#pxlSizeWidth").val(),
                height: $("#pxlSizeHeight").val()
            };
        }

        var pxlMargins = $("#pxlMargins").val();
        if ($("#pxlMarginsActive").prop('checked')) {
            pxlMargins = {
                top: $("#pxlMarginsTop").val(),
                right: $("#pxlMarginsRight").val(),
                bottom: $("#pxlMarginsBottom").val(),
                left: $("#pxlMarginsLeft").val()
            };
        }

        var copies = 1;
        var jobName = null;
        if ($("#rawTab").hasClass("active")) {
            copies = $("#rawCopies").val();
            jobName = $("#rawJobName").val();
        } else {
            copies = $("#pxlCopies").val();
            jobName = $("#pxlJobName").val();
        }

        cfg.reconfigure({
                            altPrinting: $("#rawAltPrinting").prop('checked'),
                            encoding: $("#rawEncoding").val(),
                            endOfDoc: $("#rawEndOfDoc").val(),
                            perSpool: $("#rawPerSpool").val(),

                            colorType: $("#pxlColorType").val(),
                            copies: copies,
                            density: $("#pxlDensity").val(),
                            duplex: $("#pxlDuplex").prop('checked'),
                            interpolation: $("#pxlInterpolation").val(),
                            jobName: jobName,
                            margins: pxlMargins,
                            orientation: $("#pxlOrientation").val(),
                            paperThickness: $("#pxlPaperThickness").val(),
                            printerTray: $("#pxlPrinterTray").val(),
                            rasterize: $("#pxlRasterize").prop('checked'),
                            rotation: $("#pxlRotation").val(),
                            scaleContent: $("#pxlScale").prop('checked'),
                            size: pxlSize,
                            units: $("input[name='pxlUnits']:checked").val()
                        });
    }

    function setPrintFile() {
        setPrinter({ file: $("#askFile").val() });
        $("#askFileModal").modal('hide');
    }

    function setPrintHost() {
        setPrinter({ host: $("#askHost").val(), port: $("#askPort").val() });
        $("#askHostModal").modal('hide');
    }

    function setPrinter(printer) {
        var cf = getUpdatedConfig();
        cf.setPrinter(printer);

        if (typeof printer === 'object' && printer.name == undefined) {
            var shown;
            if (printer.file != undefined) {
                shown = "<em>FILE:</em> " + printer.file;
            }
            if (printer.host != undefined) {
                shown = "<em>HOST:</em> " + printer.host + ":" + printer.port;
            }

            $("#configPrinter").html(shown);
        } else {
            if (printer.name != undefined) {
                printer = printer.name;
            }

            if (printer == undefined) {
                printer = 'NONE';
            }
            $("#configPrinter").html(printer);
        }
    }
