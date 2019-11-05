var delay = (function() {
    var timer = 0;
    var total_pages = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();
var odd = 0;
var total_print_documents = 0;
var total_barcodes_printed = 0;
var qz_array = [];
var finished = true;
var allowedColors = ["GOLD","LIGHT-GOLD","DARK-GOLD","ROSE-GOLD","COPPER","RED","LIGHT-RED","MAROON","DARK-MAROON","GREEN","BOTTLE-GREEN","PISTA-GREEN","MEHENDI-GREEN","LIGHT-GREEN","LIGHT-PINK","PARROT-GREEN","BLUE","LIGHT-BLUE","ROYAL-BLUE","NAVY-BLUE","LIRIL","TOMATO-PINK","PINK","PINKISH-MAROON","ORANGE","PEACH","MULTI","GREY","PURPLE","BRINJAL","WINE","BLACK","YELLOW","MUSTARD","PINK-MULTI","RED-MULTI","BLUE-MULTI","GREEN-MULTI","YELLOW-MULTI","WHITE","OFF-WHITE","CREAM","SILVER","ANTIC-GOLD","SKIN","BROWN","MAGENTA","MAROON-MULTI","BLACK-MULTI","RAMA-GREEN","PEACOCK-BLUE","NEON-MULTI","FIROZI","YELLOW-GOLD","SKY-BLUE","LIGHT-ORANGE","DARK-COPPER","ONION-PINK","TEAL","BEIGE","FUCHSIA","DARK-PINK","OLIVE-GREEN","MINT-GREEN","LIME-YELLOW","PASTEL-BLUE","LIME-GREEN","PASTEL-GREEN","DUSTY-BLUE","DUSTY-PEACH","DARK-GREEN","DUSTY-GREEN","S-PINK","GERMAN-GREEN","FIRE-BLUE","DARK-GRAY","GERMAN-BLUE","DARK-BRINJAL"];
var allowedSizes = ["26","28","30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60", "L", "XL", "XXL", "M", "S", "XS", "XXS", "XXXL", "4XL", "28", "FS", "14Y", "6Y", "8Y", "2Y", "4Y", "10Y", "12Y" , "NA","S/M","L/XL"];

var allowedStates =["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir",
"Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim",
"Tamil Nadu","Tripura","Uttaranchal","Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadar and Nagar Haveli","Daman and Diu","Delhi","Lakshadeep","Pondicherry"];


var selectedSubOrders = new Array;
jQuery(function($) {

    /* Initializing Accordion Menu */
    
    var active_tab = $("#active_tab").val();
    var active_tab1 = active_tab.split("-");
    var currentTab = "tab" + active_tab1[0];
    $("#" + currentTab).addClass("selected");
    $("#" + active_tab).css("background-color", "#333333");
    if ($('.left_accordion').length > 0) {
        $('.left_accordion').navAccordion({
                expandButtonText: '', //Text inside of buttons can be HTML
                collapseButtonText: ''
            },
            function() {
                console.log('Callback')
            });
    }
    /* End of accordion menu initalization */

    $('body').on('keypress', function(e) {
        if (e.which == 13)
            return false;
    });

    var now = new Date();
    var from = new Date();
    var to = new Date();
    var max = new Date();
    var min = new Date();


    max.setDate(max.getDate() + 1);
    min.setDate(min.getDate() + 90);
    from.setDate(max.getDate() - 7);
    /*
    $('#from').datetimepicker(
    {
         defaultDate: from,
         maxDate:max,
         minDate:min
    });
    */
   

    $('#state').change(function(){
        var val = $(this).val();
        if (val == 'Andhra Pradesh') {
    var andhra = ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "SriPotti Sri Ramulu Nellore",
        "Vishakhapatnam", "Vizianagaram", "West Godavari", "Cudappah"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < andhra.length; i++) {
            options += '<option value="' + andhra[i] + '">' + andhra[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Arunachal Pradesh') {
    var ap = ["Anjaw", "Changlang", "Dibang Valley", "East Siang", "East Kameng", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Papum Pare",
        "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < ap.length; i++) {
            options += '<option value="' + ap[i] + '">' + ap[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Assam') {
    var assam = ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Chirang", "Darrang", "Dhemaji", "Dima Hasao", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat",
        "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < assam.length; i++) {
            options += '<option value="' + assam[i] + '">' + assam[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Bihar') {
    var bihar = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
        "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
        "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < bihar.length; i++) {
            options += '<option value="' + bihar[i] + '">' + bihar[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Chhattisgarh') {
    var Chhattisgarh = ["Bastar", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Jashpur", "Janjgir-Champa", "Korba", "Koriya", "Kanker", "Kabirdham (formerly Kawardha)", "Mahasamund",
        "Narayanpur", "Raigarh", "Rajnandgaon", "Raipur", "Surajpur", "Surguja"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < Chhattisgarh.length; i++) {
            options += '<option value="' + Chhattisgarh[i] + '">' + Chhattisgarh[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Dadra and Nagar Haveli') {
    var dadra = ["Amal", "Silvassa"];
    $(function() {
        var options = '';
        for (var i = 0; i < dadra.length; i++) {
            options += '<option value="' + dadra[i] + '">' + dadra[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Daman and Diu') {
    var daman = ["Daman", "Diu"];
    $(function() {
        var options = '';
        for (var i = 0; i < daman.length; i++) {
            options += '<option value="' + daman[i] + '">' + daman[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Delhi') {
    var delhi = ["Delhi", "New Delhi", "North Delhi", "Noida", "Patparganj", "Sonabarsa", "Tughlakabad"];
    $(function() {
        var options = '';
        for (var i = 0; i < delhi.length; i++) {
            options += '<option value="' + delhi[i] + '">' + delhi[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Goa') {
    var goa = ["Chapora", "Dabolim", "Madgaon", "Marmugao (Marmagao)", "Panaji Port", "Panjim", "Pellet Plant Jetty/Shiroda", "Talpona", "Vasco da Gama"];
    $(function() {
        var options = '';
        for (var i = 0; i < goa.length; i++) {
            options += '<option value="' + goa[i] + '">' + goa[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Gujarat') {
    var gujarat = ["Ahmedabad", "Amreli district", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Dang", "Gandhinagar", "Jamnagar", "Junagadh",
        "Kutch", "Kheda", "Mehsana", "Narmada", "Navsari", "Patan", "Panchmahal", "Porbandar", "Rajkot", "Sabarkantha", "Surendranagar", "Surat", "Tapi", "Vadodara", "Valsad"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < gujarat.length; i++) {
            options += '<option value="' + gujarat[i] + '">' + gujarat[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Haryana') {
    var haryana = ["Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurgaon", "Hissar", "Jhajjar", "Jind", "Karnal", "Kaithal",
        "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamuna Nagar"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < haryana.length; i++) {
            options += '<option value="' + haryana[i] + '">' + haryana[i] + '</option>';
        }
        $('#city').html(options);
    });
}


if (val == 'Himachal Pradesh') {
    var himachal = ["Baddi", "Baitalpur", "Chamba", "Dharamsala", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti", "Mandi", "Simla", "Sirmaur", "Solan", "Una"];
    $(function() {
        var options = '';
        for (var i = 0; i < himachal.length; i++) {
            options += '<option value="' + himachal[i] + '">' + himachal[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Jammu and Kashmir') {
    var jammu = ["Jammu", "Leh", "Rajouri", "Srinagar"];
    $(function() {
        var options = '';
        for (var i = 0; i < jammu.length; i++) {
            options += '<option value="' + jammu[i] + '">' + jammu[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Jharkhand') {
    var jharkhand = ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
        "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < jharkhand.length; i++) {
            options += '<option value="' + jharkhand[i] + '">' + jharkhand[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Karnataka') {
    var karnataka = ["Bagalkot", "Bangalore", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Bijapur", "Chamarajnagar", "Chikkamagaluru", "Chikkaballapur",
        "Chitradurga", "Davanagere", "Dharwad", "Dakshina Kannada", "Gadag", "Gulbarga", "Hassan", "Haveri district", "Kodagu",
        "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Ramanagara", "Yadgir"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < karnataka.length; i++) {
            options += '<option value="' + karnataka[i] + '">' + karnataka[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Kerala') {
    var kerala = ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Thiruvananthapuram", "Wayanad"];
    $(function() {
        var options = '';
        for (var i = 0; i < kerala.length; i++) {
            options += '<option value="' + kerala[i] + '">' + kerala[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Madhya Pradesh') {
    var mp = ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhilai", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Dewas", "Dhar", "Guna", "Gwalior", "Hoshangabad",
        "Indore", "Itarsi", "Jabalpur", "Khajuraho", "Khandwa", "Khargone", "Malanpur", "Malanpuri (Gwalior)", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Pithampur", "Raipur", "Raisen", "Ratlam",
        "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Singrauli", "Ujjain"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < mp.length; i++) {
            options += '<option value="' + mp[i] + '">' + mp[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Maharashtra') {
    var maharashtra = ["Ahmednagar", "Akola", "Alibag", "Amaravati", "Arnala", "Aurangabad", "Aurangabad", "Bandra", "Bassain", "Belapur", "Bhiwandi", "Bhusaval", "Borliai-Mandla", "Chandrapur", "Dahanu", "Daulatabad", "Dighi (Pune)", "Dombivali", "Goa", "Jaitapur", "Jalgaon",
        "Jawaharlal Nehru (Nhava Sheva)", "Kalyan", "Karanja", "Kelwa", "Khopoli", "Kolhapur", "Lonavale", "Malegaon", "Malwan", "Manori",
        "Mira Bhayandar", "Miraj", "Mumbai", "Murad", "Nagapur", "Nagpur", "Nalasopara", "Nanded", "Nandgaon", "Nasik", "Navi Mumbai", "Nhave", "Osmanabad", "Palghar",
        "Panvel", "Pimpri", "Pune", "Ratnagiri", "Sholapur", "Shrirampur", "Shriwardhan", "Tarapur", "Thana", "Thane", "Trombay", "Varsova", "Vengurla", "Virar", "Wada", "Kalyan","SANGLI"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < maharashtra.length; i++) {
            options += '<option value="' + maharashtra[i] + '">' + maharashtra[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Manipur') {
    var manipur = ["Bishnupur", "Churachandpur", "Chandel", "Imphal East", "Senapati", "Tamenglong", "Thoubal", "Ukhrul", "Imphal West"];
    $(function() {
        var options = '';
        for (var i = 0; i < manipur.length; i++) {
            options += '<option value="' + manipur[i] + '">' + manipur[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Meghalaya') {
    var meghalaya = ["Baghamara", "Balet", "Barsora", "Bolanganj", "Dalu", "Dawki", "Ghasuapara", "Mahendraganj", "Moreh", "Ryngku", "Shella Bazar", "Shillong"];
    $(function() {
        var options = '';
        for (var i = 0; i < meghalaya.length; i++) {
            options += '<option value="' + meghalaya[i] + '">' + meghalaya[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Mizoram') {
    var mizoram = ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"];
    $(function() {
        var options = '';
        for (var i = 0; i < mizoram.length; i++) {
            options += '<option value="' + mizoram[i] + '">' + mizoram[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Nagaland') {
    var nagaland = ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"];
    $(function() {
        var options = '';
        for (var i = 0; i < nagaland.length; i++) {
            options += '<option value="' + nagaland[i] + '">' + nagaland[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Orissa') {
    var orissa = ["Bahabal Pur", "Bhubaneswar", "Chandbali", "Gopalpur", "Jeypore", "Paradip Garh", "Puri", "Rourkela"];
    $(function() {
        var options = '';
        for (var i = 0; i < orissa.length; i++) {
            options += '<option value="' + orissa[i] + '">' + orissa[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Puducherry') {
    var puducherry = ["Karaikal", "Mahe", "Pondicherry", "Yanam"];
    $(function() {
        var options = '';
        for (var i = 0; i < puducherry.length; i++) {
            options += '<option value="' + puducherry[i] + '">' + puducherry[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Punjab') {
    var punjab = ["Amritsar", "Barnala", "Bathinda", "Firozpur", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Sri Muktsar Sahib", "Pathankot",
        "Patiala", "Rupnagar", "Ajitgarh (Mohali)", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < punjab.length; i++) {
            options += '<option value="' + punjab[i] + '">' + napunjabgaland[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Rajasthan') {
    var rajasthan = ["Ajmer", "Banswara", "Barmer", "Barmer Rail Station", "Basni", "Beawar", "Bharatpur", "Bhilwara", "Bhiwadi", "Bikaner", "Bongaigaon", "Boranada, Jodhpur", "Chittaurgarh", "Fazilka", "Ganganagar", "Jaipur", "Jaipur-Kanakpura",
        "Jaipur-Sitapura", "Jaisalmer", "Jodhpur", "Jodhpur-Bhagat Ki Kothi", "Jodhpur-Thar", "Kardhan", "Kota", "Munabao Rail Station", "Nagaur", "Rajsamand", "Sawaimadhopur", "Shahdol", "Shimoga", "Tonk", "Udaipur"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < rajasthan.length; i++) {
            options += '<option value="' + rajasthan[i] + '">' + rajasthan[i] + '</option>';
        }
        $('#city').html(options);
    });
}

if (val == 'Sikkim') {
    var sikkim = ["Chamurci", "Gangtok"];
    $(function() {
        var options = '';
        for (var i = 0; i < sikkim.length; i++) {
            options += '<option value="' + sikkim[i] + '">' + sikkim[i] + '</option>';
        }
        $('#city').html(options);
    });
}


if (val == 'Tamil Nadu') {
    var tn = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mandapam", "Nagapattinam", "Nilgiris", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Thiruvallur", "Tirupur", "Tiruvarur", "Kovilpatti", "Chidambaram",
        "Tiruchirapalli", "Theni", "Tirunelveli", "Thanjavur", "Thoothukudi", "Tiruvallur", "Tiruvannamalai", "Vellore", "Villupuram", "Viruthunagar","Kovilpatti","Trivandrum","Tiruchirapalli","Nagercoil","Podicherry"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < tn.length; i++) {
            options += '<option value="' + tn[i] + '">' + tn[i] + '</option>';
        }
        $('#city').html(options);
    });
}


if (val == 'Telangana') {
    var telangana = ["Adilabad", "Hyderabad", "Karimnagar", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Ranga Reddy", "Warangal"];
    $(function() {
        var options = '';
        for (var i = 0; i < telangana.length; i++) {
            options += '<option value="' + telangana[i] + '">' + telangana[i] + '</option>';
        }
        $('#city').html(options);
    });
}


if (val == 'Tripura') {
    var tripura = ["Agartala", "Dhalaighat", "Kailashahar", "Kamalpur", "Kanchanpur", "Kel Sahar Subdivision", "Khowai", "Khowaighat", "Mahurighat", "Old Raghna Bazar", "Sabroom", "Srimantapur"];
    $(function() {
        var options = '';
        for (var i = 0; i < tripura.length; i++) {
            options += '<option value="' + tripura[i] + '">' + tripura[i] + '</option>';
        }
        $('#city').html(options);
    });
}


if (val == 'Uttar Pradesh') {
    var up = ["Agra", "Allahabad", "Auraiya", "Banbasa", "Bareilly", "Berhni", "Bhadohi", "Dadri", "Dharchula", "Gandhar", "Gauriphanta", "Ghaziabad", "Gorakhpur", "Gunji",
        "Jarwa", "Jhulaghat (Pithoragarh)", "Kanpur", "Katarniyaghat", "Khunwa", "Loni", "Lucknow", "Meerut", "Moradabad", "Muzaffarnagar", "Nepalgunj Road", "Pakwara (Moradabad)",
        "Pantnagar", "Saharanpur", "Sonauli", "Surajpur", "Tikonia", "Varanasi"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < up.length; i++) {
            options += '<option value="' + up[i] + '">' + up[i] + '</option>';
        }
        $('#city').html(options);
    });
}


if (val == 'Uttarakhand') {
    var uttarakhand = ["Almora", "Badrinath", "Bangla", "Barkot", "Bazpur", "Chamoli", "Chopra", "Dehra Dun", "Dwarahat", "Garhwal", "Haldwani", "Hardwar", "Haridwar", "Jamal", "Jwalapur", "Kalsi", "Kashipur", "Mall",
        "Mussoorie", "Nahar", "Naini", "Pantnagar", "Pauri", "Pithoragarh", "Rameshwar", "Rishikesh", "Rohni", "Roorkee", "Sama", "Saur"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < uttarakhand.length; i++) {
            options += '<option value="' + uttarakhand[i] + '">' + uttarakhand[i] + '</option>';
        }
        $('#city').html(options);
    });
}


if (val == 'West Bengal') {
    var wb = ["Alipurduar", "Bankura", "Bardhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah",
        "Jalpaiguri", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ];
    $(function() {
        var options = '';
        for (var i = 0; i < wb.length; i++) {
            options += '<option value="' + wb[i] + '">' + wb[i] + '</option>';
        }
        $('#city').html(options);
    });
}
    });



    $('.from-datetimepicker').datetimepicker({
        defaultDate: from,
    });
    $('.bill-datetimepicker1').datetimepicker({
        defaultDate: to,
        format: 'DD/MM/YYYY'
    });
    $('.bill-datetimepicker2').datetimepicker({
        defaultDate: to,
        format: 'DD/MM/YYYY'
    });

    $('.to-datetimepicker').datetimepicker({
        defaultDate: to
    });
    $('#billing_date').datetimepicker({
        defaultDate: to,
        maxDate: now
    });
    $('.return-datetimepicker').datetimepicker({
        defaultDate: to,
        minDate: to
    });

    $('#unstitched, #against_h_form').change(function() {

        if ($("#fabric_sale").val() == 1)
            calculateTotalFabric();
        else
            calculateTotal();


    });

    $('#discount_percentage').change(function() {
            calculateTotal();
    });

/*
    $('body').delegate('.barcodeScanner .barcode', 'change', function() {
            calculateTotal();
    });
*/
    $("body").delegate(".pagination a", "click", function() {
        var page = $(this).data('page');
        if (page == "disabled") {} else if (page == "previous") {
            var current_page = $(".active a").data('page');
            if (typeof current_page == "undefined" || current_page == "" || current_page == 0)
                current_page = 1;
            $(".active").toggleClass("active");
            current_page--;
            organizePagination(total_pages, current_page);
            updateContent();
        } else if (page == "next") {
            var current_page = $(".active a").data('page');
            if (typeof current_page == "undefined" || current_page == "" || current_page == 0)
                current_page = 1;
            $(".active").toggleClass("active");
            current_page++;
            organizePagination(total_pages, current_page);
            updateContent();
        } else {
            $(".active").toggleClass("active");
            $(this).closest("li").toggleClass("active");
            updateContent();
        }
    });


    $('body').delegate('.view_entries_table .options', 'click', function() {
        var id = $(this).closest('tr').data('id');

        if ($(this).attr('data-edit'))
            document.location.href = $('#route_path').val() + '/' + id;
        else
            document.location.href = $('#route_path').val() + '/' + id;
    });


    $(".barcodeScanner").scroll(function() {
        var divend = $(this)[0].scrollHeight //+ $(this).offset().top; // full height of div (from top and actual div height).
        var pagescroll = $(this).scrollTop() + $(this).height(); // Total page scrolled.
        if (divend <= pagescroll) {
            var newId = $('.barcodeScanner table tr:last').data('id') + 1;
            var newRow = '<tr id="element-' + newId + '" data-id="' + newId + '">';
            newRow += '<td>' + newId + '</td>';
            newRow += '<td style="width:150px"><input type="text" class="barcode barcode_field" id="barcode-' + newId + '" autocomplete="off" value=""></td>';
            newRow += '<td class="description"></td>';
            newRow += '<td style="width:150px"><input type="text" class="barcode quantity" id="quantity-' + newId + '" autocomplete="off" value=""></td>';
            newRow += '<td class="mrp"></td>';
            newRow += '<td class="discount_rate"></td>';
            newRow += '<td class="discount"></td>';
            newRow += '<td class="taxable_value"></td>';    
            newRow += '<td class="gst_rate"></td>';
            newRow += '<td class="sgst"></td>';
            newRow += '<td class="cgst"></td>';
            newRow += '<td class="igst"></td>';
            newRow += '<td class="total"></td>';
            newRow += '<td class="net"></td>';
            newRow += '<td class="original" style="display:none;"></td>';
            // alert(newRow);
            $('.barcodeScanner table').append(newRow);
            // alert(" Div End reached! "+$(this).offset().top);
            //alert("Full DIV height: "+divend+" Scroll page Height: "+pagescroll); 
        }

    });

    $(".barcodeScanner_approval").scroll(function() {
        var divend = $(this)[0].scrollHeight //+ $(this).offset().top; // full height of div (from top and actual div height).
        var pagescroll = $(this).scrollTop() + $(this).height(); // Total page scrolled.
        if (divend <= pagescroll) {
            var newId = $('.barcodeScanner_approval table tr:last').data('id') + 1;
            var newRow = '<tr id="element-' + newId + '" data-id="' + newId + '">';
            newRow += '<td>' + newId + '</td>';
            newRow += '<td style="width:150px"><input type="text" class="barcode barcode_field" id="barcode-' + newId + '" autocomplete="off" value=""></td>';
            newRow += '<td class="design"></td>';
            newRow += '<td class="color"></td>';
            newRow += '<td class="size"></td>';
            newRow += '<td class="mrp"></td>';
            $('.barcodeScanner_approval table').append(newRow);
        }

    });


    $(".orderScanner").scroll(function() {
        var divend = $(this)[0].scrollHeight
        var pagescroll = $(this).scrollTop() + $(this).height();
        if (divend <= pagescroll) {
            var newId = $('.orderScanner table tr:last').data('id') + 1;
            var newRow = '<tr id="element-' + newId + '" data-id="' + newId + '">';
            newRow += '<td>' + newId + '</td>';
            newRow += '<td contenteditable="true" class="design"></td>';
            newRow += '<td contenteditable="true" class="color"></td>';
            newRow += '<td contenteditable="true" class="size"></td>';
            newRow += '<td contenteditable="true" class="quantity"></td>';
            newRow += '<td contenteditable="true" class="note"></td>';
            $('.orderScanner table').append(newRow);
        }
    });
    $(".inwardScanner").scroll(function() {
        var divend = $(this)[0].scrollHeight
        var pagescroll = $(this).scrollTop() + $(this).height();
        if (divend <= pagescroll) {
            var newId = $('.inwardScanner table tr:last').data('id') + 1;
            var newRow = '<tr id="element-' + newId + '" data-id="' + newId + '">';
            newRow += '<td>' + newId + '</td>';
            newRow += '<td contenteditable="true" class="design"></td>';
            newRow += '<td contenteditable="true" class="color"></td>';
            newRow += '<td contenteditable="true" class="size"></td>';
            newRow += '<td contenteditable="true" class="quantity"></td>';
            newRow += '<td contenteditable="true" class="billing_amount"></td>';
            newRow += '<td contenteditable="true" class="total"></td>';
            $('.inwardScanner table').append(newRow);
        }
    });



});



function highlightIfEmpty(element) {
    if (element.text() == "" || element.text() == null) {
        element.focus();
        //element.style("border-color:red")
        return false;
    } else {
        return true;
    }
}

function highlightIfEmpty2(element) {
    if (element.val() == "" || element.val() == null) {
        element.focus();
        //element.style("border-color:red")
        return false;
    } else {
        return true;
    }
}

function calculateTotalOld() {
    var barcode = $("#element-1 .barcode").val();
    var i = 1;
    var sum = 0;
    var quantity = 0;
    
    while (barcode != "" && barcode != null) {
        var mrp = $("#element-" + i + " .mrp").html();
        sum = sum + parseFloat(mrp);
        i++;
        quantity++;
        barcode = $("#element-" + i + " .barcode").val();
    }
    if (isNaN(sum))
        sum = 0;


    $('#billing_amount').val(sum);
    $('#quantity').val(quantity);
    var total = parseFloat(sum).toFixed(2);
    total = parseFloat(total).toFixed(2);
    $('#total').val(total);
}


function calculateTotal() {
    var barcode = $("#element-1 .barcode").val();
    var i = 1;
    var sum = parseFloat(0);
    var taxable_value = 0;
    var cgst = 0;
    var sgst = 0;
    var discount = 0;
    var discount_rate = 0;
    var quantity = 0;
    var net = 0;
    var net_sum = 0;
    var discount_sum = 0;
    var sgst_sum = 0;
    var cgst_sum = 0;
    var igst_sum = 0;
    var quantity_sum = 0;
    var bill_sum = 0;
    var bill_amt ;
    var gst_type = $("#gst_type").val();
    var type_client = $("#type_client").val();
    var against_h_form = $("#against_h_form").val();
    var transport_charges = $("#transport_charge").val();
    
    var cgst_2_5 = 0;
    var sgst_2_5 = 0;
    var cgst_6 = 0;
    var sgst_6 = 0;
    var igst_5 = 0;
    var igst_12 = 0;
    var cgst_0_05 = 0;
    var igst_0_1 =  0;

    var round_up = 0;



    while (barcode != "" && barcode != null) {
        mrp = parseFloat($("#element-" + i + " .mrp").data("val")).toFixed(2);
        quantity = parseFloat($("#element-" + i + " .quantity").val()).toFixed(2);
        bill_amt = mrp * quantity;
        discount_rate = $("#discount_percentage").val();
        discount = parseFloat(mrp * discount_rate / 100).toFixed(2);
        discount_amt = discount * quantity;
        var selling_rate = parseFloat(mrp) - parseFloat(discount);
        if(discount < 1)                                         
            discount_rate = parseFloat(0).toFixed(2);    
        if(type_client.toLowerCase() == "ethnicity"){
            var retail = parseFloat($("#element-" + i + " .mrp").data("retail")).toFixed(2);
            discount = parseFloat(retail * discount_rate / 100).toFixed(2);
            selling_rate = parseFloat(mrp) - parseFloat(discount);
            discount_amt = discount * quantity;
        }
        
        taxable_value = parseFloat(bill_amt - discount_amt);
        //alert(taxable_value); alert(selling_rate);
        if(gst_type == "S"){

            if(against_h_form == 1){
                gst_rate = parseFloat(0.1).toFixed(2);
                cgst_0_05 += taxable_value;
            }else{

                if(selling_rate <= 1000){
                gst_rate = parseFloat(5).toFixed(2);
                cgst_2_5 += taxable_value;
                }
                else{
                gst_rate = parseFloat(12).toFixed(2);
                cgst_6 += taxable_value;
                } 

            }

        
        }else{

            if(against_h_form == 1){
                gst_rate = parseFloat(0.1).toFixed(2);
                igst_0_1 += taxable_value;
            }else{
                if(selling_rate <= 1000){
                gst_rate = parseFloat(5).toFixed(2);
                igst_5 += taxable_value;
                }
                else{
                gst_rate = parseFloat(12).toFixed(2);
                igst_12 += taxable_value;
                }
            }
        }
        
            
            net = total;
            
            $("#element-" + i + " .mrp").text(mrp);
            $("#element-" + i + " .discount_rate").text(discount_rate); 
            $("#element-" + i + " .discount").text(discount_amt);  
            $("#element-" + i + " .taxable_value").text(taxable_value.toFixed(2));
            $("#element-" + i + " .gst_rate").text(gst_rate);
            $("#element-" + i + " .quantity").val(quantity);
        
        quantity_sum = parseFloat(quantity_sum) + parseFloat($("#element-" + i + " .quantity").val());
        bill_sum = bill_sum + parseFloat(bill_amt);
         

        sum =  parseFloat(sum) + parseFloat($("#element-" + i + " .mrp").html());
        discount_sum = parseFloat(discount_sum) + parseFloat($("#element-" + i + " .discount").html());
        i++;
        barcode = $("#element-" + i + " .barcode").val();
    }
    if(cgst_2_5 > 0 || cgst_6 > 0 || cgst_0_05 > 0)
        cgst_sum += parseFloat(+percentage(cgst_2_5, 2.5) + +percentage(cgst_6, 6) + +percentage(cgst_0_05, 0.05));
    
    sgst_sum = cgst_sum;
    
    if(igst_5 > 0 || igst_12 > 0 || igst_0_1 > 0){
    igst_sum = parseFloat(+percentage(igst_5, 5) + +percentage(igst_12, 12) + +percentage(igst_0_1, 0.1));
    }
    
    //alert(igst_sum);alert(cgst_sum);alert(sgst_sum);
    net_sum = bill_sum - discount_sum + sgst_sum + cgst_sum + igst_sum;
    if(transport_charges)
        net_sum = net_sum + parseFloat(transport_charges);  
    
    var temp_round_up = net_sum.toFixed(0);
    round_up = temp_round_up - net_sum;
    $('#billing_amount').val(bill_sum.toFixed(2));
    $('#quantity').val(quantity_sum.toFixed(2));
    $('#sgst').val(sgst_sum.toFixed(2));
    $('#cgst').val(cgst_sum.toFixed(2));
    $('#igst').val(igst_sum.toFixed(2));
    $('#discount').val(discount_sum.toFixed(2));
    $('#round_up').val(round_up.toFixed(2));
    $('#total').val(net_sum.toFixed(0));
}
function percentage(number, percent)
{
    var percentageValue = (number.toFixed(2)*percent*0.01);
    percentageValue = (Math.round( percentageValue * 100 ) / 100).toFixed(2);
    return percentageValue;
}


function reinitializeFields() {
    $("#barcodes").val("");
    $("#designs").val("");
    $("#colors").val("");
    $("#sizes").val("");
    $("#billing_amounts").val("");
    $("#taxable_amounts").val("");
    $("#descriptions").val("");
    $("#gst_rates").val("");
     $("#sgst_amounts").val("");
    $("#cgst_amounts").val("");
    $("#igst_amounts").val("");

    $("#discount_amounts").val("");
    $("#totals").val("");

    $("#quantities").val("");
    $("#notes").val("");
    $("#old_barcodes").val("");
    $("#new_barcodes").val("");
    $("#old_skus").val("");
    $("#new_skus").val("");
}

function copySalesContentOld() {
    //alert("test");
    reinitializeFields();
    var barcode = $("#element-1 .barcode").val();

    calculateTotalOld();

    var i = 1;
    if (barcode == "" || barcode == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to scan atleast one barcode to process your order");
        return false;
    }
    while (barcode != "" && barcode != null) {
        //alert(barcode);
        var design = $("#element-" + i + " .design");
        var color = $("#element-" + i + " .color");
        var fabric_sale = $("#fabric_sale").val();
        var size = 0;
        var quantity = 0;

        if (fabric_sale != 1)
            size = $("#element-" + i + " .size");
        else
            quantity = $("#element-" + i + " .quantity");
        var mrp = $("#element-" + i + " .mrp");



        if (fabric_sale != 1) {
            if (highlightIfEmpty(design) && highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(mrp)) {
                $("#barcodes").val($("#barcodes").val() + "" + barcode + ";");
                $("#designs").val($("#designs").val() + "" + design.text() + ";");
                $("#colors").val($("#colors").val() + "" + color.text() + ";");

                if (fabric_sale != 1)
                    $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
                else
                    $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");

                $("#billing_amounts").val($("#billing_amounts").val() + "" + mrp.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
                return false;
            }
        }

        if (fabric_sale != 0) {
            if (highlightIfEmpty(design) && highlightIfEmpty(color) && highlightIfEmpty(quantity) && highlightIfEmpty(mrp)) {
                $("#barcodes").val($("#barcodes").val() + "" + barcode + ";");
                $("#designs").val($("#designs").val() + "" + design.text() + ";");
                $("#colors").val($("#colors").val() + "" + color.text() + ";");

                if (fabric_sale != 1)
                    $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
                else
                    $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");

                $("#billing_amounts").val($("#billing_amounts").val() + "" + mrp.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
                return false;
            }
        }


        //alert("In Loop : "+i)



        i++;

        //alert("Starting Loop : "+i);
        barcode = $("#element-" + i + " .barcode").val();
        //alert("Barcode: " + barcode);
    }
    //alert("Final Barcode: "+barcode);
    $("#quantity").val(i - 1);
    return true;
}

function copySalesContent() {
    reinitializeFields();
    var barcode = $("#element-1 .barcode").val();
    calculateTotal();
    var i = 1;
    if (barcode == "" || barcode == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to scan atleast one barcode to process your order");
        return false;
    }
    while (barcode != "" && barcode != null) {
        var sgst = $("#element-" + i + " .sgst");
        var cgst = $("#element-" + i + " .cgst");
        var igst = $("#element-" + i + " .igst");
        var description = $("#element-" + i + " .description");
        var discount = $("#element-" + i + " .discount");
        var total = $("#element-" + i + " .net");
        var mrp = $("#element-" + i + " .mrp");
        var taxable_amount = $("#element-" + i + " .taxable_value");
        var gst_rate = $("#element-" + i + " .gst_rate");
        var quantity = $("#element-" + i + " .quantity");
            if (highlightIfEmpty(mrp)) {
                $("#barcodes").val($("#barcodes").val() + "" + barcode + ";");
                $("#billing_amounts").val($("#billing_amounts").val() + "" + mrp.text() + ";");
                $("#taxable_amounts").val($("#taxable_amounts").val() + "" + taxable_amount.text() + ";");
                $("#descriptions").val($("#descriptions").val() + "" + description.text() + ";");
                
                $("#gst_rates").val($("#gst_rates").val() + "" + gst_rate.text() + ";");
                $("#sgst_amounts").val($("#sgst_amounts").val() + "" + sgst.text() + ";");
                $("#cgst_amounts").val($("#cgst_amounts").val() + "" + cgst.text() + ";");
                $("#igst_amounts").val($("#igst_amounts").val() + "" + igst.text() + ";");
                $("#discount_amounts").val($("#discount_amounts").val() + "" + discount.text() + ";");
                $("#quantities").val($("#quantities").val() + "" + quantity.val() + ";");
                $("#totals").val($("#totals").val() + "" + total.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
                return false;
            }
        i++;
        barcode = $("#element-" + i + " .barcode").val();
    }
    //$("#quantity").val(i - 1);
    return true;
}

function copyExciseSalesContent()
{

  reinitializeFields();

  alert("tests");

  var design = $("#element-1 .design").val();
 
  exciseTotal();

  var i = 1;
  if(design == "" || design == null){
    $("#error-feedback").show().delay(5000).fadeOut();
    $("#error-feedback").html("You need to scan atleast one barcode to process your order");
    return false;
  } 
  while(design!="" && design!=null)
  {
    var design = $("#element-"+i+" .design");
    var color = $("#element-"+i+" .color");
    var size = $("#element-"+i+" .size");
    var quantity = $("#element-"+i+" .quantity");
    var mrp = $("#element-"+i+" .mrp");
   // var excise_mrp_total = $("#element-" +i+ " .excise_total");
  

  // if(highlightIfEmpty(design) && highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(mrp))
  //  {

      $("#designs").val($("#designs").val()+ "" + design+ ";");
      $("#colors").val($("#colors").val()+  "" + color.text()+ ";");
      $("#sizes").val($("#sizes").val()+  "" + size.text()+ ";");
      $("#quantities").val($("#quantities").val()+  "" + quantity.text()+ ";");
      $("#billing_amounts").val($("#billing_amounts").val()+ "" + mrp.text()+ ";");
     // $("#excisetotals").val($("#excisetotals").val() + "" + excise_mrp_total.val()+ ";");
  //  }

 /*   else{
    $("#error-feedback").show().delay(5000).fadeOut();
    $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
    return false;
    }*/

    i++;  
    design = $("#element-"+i+" .design").val();
  }

  return true; 
}


function copyDebitNotesContent() {
    //reinitializeFields all fields commented all fields getting empty;
    //$("#client").val("");
    //$("#amount").val("");
    //$("#date_received").val("");
    //$("#narration").val("");
    //$("#additional_description").val("");

    var client = $('#client').val();
    var amount = $('#amount').val();
    var date_received = $('#date_received').val();
    var narration = $('#narration').val();
    var additional_description = $('#additional_description').val();

    return true;
}

function copyAlterationsContent() {
    reinitializeFields();
    var barcode1 = $("#element-1 .barcode-1").val();
    var i = 1;
    if (barcode1 == "" || barcode1 == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to scan atleast one barcode to process your order");
        return false;
    }
    while (barcode1 != "" && barcode1 != null) {
        var original_sku = $("#element-" + i + " .original_sku");
        var altered_sku = $("#element-" + i + " .altered_sku");
        var barcode2 = $("#element-" + i + " .barcode-2");
        if (highlightIfEmpty(original_sku) && highlightIfEmpty(altered_sku)) {
            $("#old_barcodes").val($("#old_barcodes").val() + "" + barcode1 + ";");
            $("#new_barcodes").val($("#new_barcodes").val() + "" + barcode2.val() + ";");
            $("#old_skus").val($("#old_skus").val() + "" + original_sku.text() + ";");
            $("#new_skus").val($("#new_skus").val() + "" + altered_sku.text() + ";");
        } else {
            $("#error-feedback").show().delay(5000).fadeOut();
            $("#error-feedback").html("We are sorry but you have not scanned your barcodes properly. <br /> Please try again...");
            return false;
        }
        i++;

        barcode1 = $("#element-" + i + " .barcode-1").val();
    }
    return true;
}



function copyWorkersContent() {
    reinitializeFields();
    var design = $("#element-1 .design").text();
    var i = 1;
    if (design == "" || design == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to insert atleast one design to proceed");
        return false;
    }

    while (design != "" && design != null) {
        var billing_amount = $("#element-" + i + " .billing_amount");
        if (highlightIfEmpty(billing_amount)) {
            if ($.isNumeric(billing_amount.text())) {
                $("#designs").val($("#designs").val() + "" + design + ";");
                $("#billing_amounts").val($("#billing_amounts").val() + "" + billing_amount.text() + ";");
            } else {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("Billing amount should be numeric on line " + i + " to process");
                return false;
            }
        } else {
            $("#error-feedback").show().delay(5000).fadeOut();
            $("#error-feedback").html("Please add the billing amount on line " + i + " to process");
            return false;
        }
        i++;
        design = $("#element-" + i + " .design").text();
    }
    return true;
}


function copyInwardsContent() {
    reinitializeFields();
    var design = $("#element-1 .design").text();
    var i = 1;
    if (design == "" || design == null) {
        $("#error-feedback").show().delay(5000).fadeOut();
        $("#error-feedback").html("You need to insert atleast one design to proceed");
        return false;
    }
    while (design != "" && design != null) {
        var barcode = $("#element-" + i + " .barcode");
        var color = $("#element-" + i + " .color");
        var size = $("#element-" + i + " .size");
        var quantity = $("#element-" + i + " .quantity");
        var billing_amount = $("#element-" + i + " .billing_amount");
        if (highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(billing_amount) && highlightIfEmpty(quantity)) {
            if (allowedSizes.indexOf(size.text()) < 0) {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("Please fill in a valid size on line " + i + " to process");
                return false;
            }
            if (allowedColors.indexOf(color.text().toUpperCase()) < 0) {
                $("#error-feedback").show().delay(5000).fadeOut();
                $("#error-feedback").html("Please fill in a valid color on line " + i + " to process");
                return false;
            }
            $("#barcodes").val($("#barcodes").val() + "" + barcode.text() + ";");
            $("#designs").val($("#designs").val() + "" + design + ";");
            $("#colors").val($("#colors").val() + "" + color.text() + ";");
            $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
            $("#billing_amounts").val($("#billing_amounts").val() + "" + billing_amount.text() + ";");
            $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");
        } else {
            $("#error-feedback").show().delay(5000).fadeOut();
            $("#error-feedback").html("Please fill in all the details on line " + i + " to process");
            return false;
        }
        i++;
        design = $("#element-" + i + " .design").text();
    }
    return true;
}

function copyOrdersContent(event) {
    reinitializeFields();
    var design = $("#element-1 .design").text();
    if (design == "" || design == null) {
        $("#designs-feedback").show().delay(5000).fadeOut();
        $("#designs-feedback").html("You need to select atleast one design to process your order");
        return false;
    }
    var i = 1;
    while (design != "" && design != null) {
        var color = $("#element-" + i + " .color");
        var size = $("#element-" + i + " .size");
        var quantity = $("#element-" + i + " .quantity");
        var note = $("#element-" + i + " .note");
        if (highlightIfEmpty(color) && highlightIfEmpty(size) && highlightIfEmpty(quantity)) {
            $("#designs").val($("#designs").val() + "" + design + ";");
            $("#colors").val($("#colors").val() + "" + color.text() + ";");
            $("#sizes").val($("#sizes").val() + "" + size.text() + ";");
            $("#notes").val($("#notes").val() + "" + note.text() + ";");
            $("#quantities").val($("#quantities").val() + "" + quantity.text() + ";");
        } else {
            event.preventDefault();
            return false;
        }
        i++;
        design = $("#element-" + i + " .design").text();
    }
    return true;
}

function printBarcodes() {

    if (qz) {
        var config = qz.configs.create("TSC TTP-247")
    } else {
        qz = document.getElementById('qz');
        config = qz.configs.create("TSC TTP-247")
    }

    var date = new Date();
    var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth()) + 1) + "." + date.getFullYear();
    var totalBarcodes = 0;
    var subTotal = 0;
    var print = print_array;
    qz_array.push("N\n");
    qz_array.push("q550\n");
    qz_array.push("Q303,26\n");
    qz_array.push('TDdd me y4\n');
    var c = 0;
    $.each(print, function(key, value) {
        pB(key, value, date_string);
        c++;
    });
    if (odd) {
        //alert("Inside odd");  
        qz_array.push('\nP1,1\n');
        c++;
        odd = 0;
        // qz_array.push('END');
        total_print_documents++;
        // alert("appending odd");
    } else {
        //  alert("not appending");
    }
    // Mark the end of a label, in this case  P1 plus a newline character
    // qz-printknows to look for this and treat this as the end of a "page"
    // for better control of larger spooled jobs (i.e. 50+ labels)
//    qz.setEndOfDocument(",1\n");

    // The amount of labels to spool to the printer at a time. When
    // qz-print counts this many `EndOfDocument`'s, a new print job will 
    // automatically be spooled to the printer and counting will start
    // over.
  //  qz.setDocumentsPerSpool("10");
    //alert("Printing: "+c);  
    //alert("Total Documents: "+total_print_documents);
    //alert("Total Barcodes: "+total_barcodes_printed);

    var r = confirm("Are you sure you want to print " + total_barcodes_printed + " barcodes");
    if (r == true) {
        qz.print(config,qz_array).catch(function(e){
            console.error(e);
        });
    }

    total_print_documents = 0;
    total_barcodes_printed = 0;

    //   monitorPrinting(qz);
}

function printBarcodesNoMRP() {

    if (qz) {
         var config = qz.configs.create("TSC TTP-247")
    } else {
        qz = document.getElementById('qz');
        config = qz.configs.create("TSC TTP-247")
    }

    var date = new Date();
    var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth()) + 1) + "." + date.getFullYear();
    var totalBarcodes = 0;
    var subTotal = 0;
    var print = print_array;
    qz_array.push("N\n");
    qz_array.push("q550\n");
    qz_array.push("Q303,26\n");
    qz_array.push('TDdd me y4\n');
    var c = 0;
    $.each(print, function(key, value) {
        pBNoMRP(key, value, date_string);
        c++;
    });
    if (odd) {
        //alert("Inside odd");  
        qz_array.push('\nP1,1\n');
        c++;
        odd = 0;
        // qz_array.push('END');
        total_print_documents++;
        // alert("appending odd");
    } else {
        //  alert("not appending");
    }
    // Mark the end of a label, in this case  P1 plus a newline character
    // qz-printknows to look for this and treat this as the end of a "page"
    // for better control of larger spooled jobs (i.e. 50+ labels)
    //qz.setEndOfDocument(",1\n");

    // The amount of labels to spool to the printer at a time. When
    // qz-print counts this many `EndOfDocument`'s, a new print job will 
    // automatically be spooled to the printer and counting will start
    // over.
    //qz.setDocumentsPerSpool("10");
    //alert("Printing: "+c);  
    //alert("Total Documents: "+total_print_documents);
    //alert("Total Barcodes: "+total_barcodes_printed);

    var r = confirm("Are you sure you want to print " + total_barcodes_printed + " barcodes");
    if (r == true) {
         qz.print(config,qz_array).catch(function(e){
            console.error(e);
        });
    }

    total_print_documents = 0;
    total_barcodes_printed = 0;

    //   monitorPrinting(qz);
}

function printBarcodesKraftiny() {

    if (qz) {
        var config = qz.configs.create("TSC TTP-247")
    } else {
        qz = document.getElementById('qz');
        config = qz.configs.create("TSC TTP-247")
    }

    var date = new Date();
    var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth()) + 1) + "." + date.getFullYear();
    var totalBarcodes = 0;
    var subTotal = 0;
    var print = print_array;
    qz_array.push("N\n");
    qz_array.push("q550\n");
    qz_array.push("Q303,26\n");
    qz_array.push('TDdd me y4\n');
    var c = 0;
    $.each(print, function(key, value) {
        pBKraftiny(key, value, date_string);
        c++;
    });
    if (odd) {
        //alert("Inside odd");  
        qz_array.push('\nP1,1\n');
        c++;
        odd = 0;
        // qz_array.push('END');
        total_print_documents++;
        // alert("appending odd");
    } else {
        //  alert("not appending");
    }
    // Mark the end of a label, in this case  P1 plus a newline character
    // qz-printknows to look for this and treat this as the end of a "page"
    // for better control of larger spooled jobs (i.e. 50+ labels)
    //qz.setEndOfDocument(",1\n");

    // The amount of labels to spool to the printer at a time. When
    // qz-print counts this many `EndOfDocument`'s, a new print job will 
    // automatically be spooled to the printer and counting will start
    // over.
    //qz.setDocumentsPerSpool("10");
    //alert("Printing: "+c);  
    //alert("Total Documents: "+total_print_documents);
    //alert("Total Barcodes: "+total_barcodes_printed);

    var r = confirm("Are you sure you want to print " + total_barcodes_printed + " barcodes");
    if (r == true) {
         qz.print(config,qz_array).catch(function(e){
            console.error(e);
        });
    }

    total_print_documents = 0;
    total_barcodes_printed = 0;

    //   monitorPrinting(qz);
}


function pBKraftiny(key, value, date_string) {
    var quantity = value['quantity'];
    var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
    var identifier = value['identifier'];
    var category = value['category'];
    if(size == "M")
        size = "36";
    if(size == "L")
        size = "38";
    if(size == "XL")
        size = "40";
    if(size == "XXL")
        size = "42";
        
    if (odd) {
        qz_array.push('B325,20,0,1A,2,2,70,B,"' + key + '"\n');
        qz_array.push('A325,125,0,3,1,1,N,"' + category + '"\n');
        qz_array.push('A325,150,0,3,1,1,N,"' + design + '"\n');
        qz_array.push('A325,175,0,3,1,1,N,"' + color + '"\n');
        qz_array.push('A545,175,0,3,1,1,N,"' + size + '"\n');
        //qz_array.push('A325,205,0,3,1,1,N,"' + identifier + '"\n');
        qz_array.push('A325,200,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
        qz_array.push('A325,225,0,1,1,1,N,"(Inclu. of all taxes)"\n');
        qz_array.push('A325,242,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
        qz_array.push('A325,259,0,1,1,1,N,"Kraftiny,Pestom Sagar Rd.3"\n');
         qz_array.push('A325,276,0,1,1,1,N,"Opp. Ambaji Niketan,Mum-89"\n');
        qz_array.push('A325,295,0,1,1,1,N,"Cont. +91-9594283890"\n');
        qz_array.push('\nP1,1\n');
        total_barcodes_printed++;
        total_print_documents++;
        odd = 0;
        quantity--;
    }
    if (quantity > 0) {
        var v = Math.floor(quantity / 2);
        if (quantity % 2 == 0 || Math.floor(quantity / 2) > 0) {
            var set = Math.floor(quantity / 2);
            var remaining = quantity % 2;
            qz_array.push('\nN\n');
            qz_array.push('B0,20,0,1A,2,2,70,B,"' + key + '"\n');
            qz_array.push('B325,20,0,1A,2,2,70,B,"' + key + '"\n');

            qz_array.push('A0,125,0,3,1,1,N,"' + category + '"\n');
            qz_array.push('A325,125,0,3,1,1,N,"' + category + '"\n');

            qz_array.push('A0,150,0,3,1,1,N,"' + design + '"\n');
            qz_array.push('A325,150,0,3,1,1,N,"' + design + '"\n');

            qz_array.push('A0,175,0,3,1,1,N,"' + color + '"\n');
            qz_array.push('A325,175,0,3,1,1,N,"' + color + '"\n');

            qz_array.push('A190,175,0,3,1,1,N,"' + size + '"\n');
            qz_array.push('A545,175,0,3,1,1,N,"' + size + '"\n');

            //qz_array.push('A0,205,0,3,1,1,N,"' + identifier + '"\n');
            //qz_array.push('A325,205,0,3,1,1,N,"' + identifier + '"\n');

            qz_array.push('A0,200,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            qz_array.push('A325,200,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');

            qz_array.push('A0,225,0,1,1,1,N,"(Inclu. of all taxes)"\n');
            qz_array.push('A325,225,0,1,1,1,N,"(Inclu. of all taxes)"\n');

            qz_array.push('A0,242,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            qz_array.push('A325,242,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            
            qz_array.push('A0,259,0,1,1,1,N,"Kraftiny,Pestom Sagar Rd.3,"\n');
            qz_array.push('A325,259,0,1,1,1,N,"Kraftiny,Pestom Sagar Rd.3,"\n');
            
            qz_array.push('A0,276,0,1,1,1,N,"Opp. Ambaji Niketan,Mum-89"\n');
            qz_array.push('A325,276,0,1,1,1,N,"Opp. Ambaji Niketan,Mum-89"\n');

            qz_array.push('A0,295,0,1,1,1,N,"Cont. +91-9594283890"\n');
            qz_array.push('A325,295,0,1,1,1,N,"Cont. +91-9594283890"\n');

            
            
            
            
            
            qz_array.push('\nP' + set + ',1\n');
            total_barcodes_printed += set * 2;
            total_print_documents++;
        }


        if (remaining || Math.floor(quantity / 2) == 0) {
            qz_array.push('\nN\n');
            qz_array.push('B0,20,0,1A,2,2,70,B,"' + key + '"\n');
            qz_array.push('A0,125,0,3,1,1,N,"' + category + '"\n');
            qz_array.push('A0,150,0,3,1,1,N,"' + design + '"\n');
            qz_array.push('A0,175,0,3,1,1,N,"' + color + '"\n');
            qz_array.push('A190,175,0,3,1,1,N,"' + size + '"\n');
            //qz_array.push('A0,205,0,3,1,1,N,"' + identifier + '"\n');

            qz_array.push('A0,200,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            qz_array.push('A0,225,0,1,1,1,N,"(Inclu. of all taxes)"\n');
            qz_array.push('A0,242,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            
            qz_array.push('A0,259,0,1,1,1,N,"Kraftiny,Pestom Sagar Rd.3"\n');
            qz_array.push('A0,276,0,1,1,1,N,"Opp. Ambaji Niketan,Mum-89"\n');
            qz_array.push('A0,295,0,1,1,1,N,"Cont. +91-9594283890"\n');
            
            total_barcodes_printed++;
            odd = 1;
            remaining = 0;
        }
    }

}

function pB(key, value, date_string) {
    var quantity = value['quantity'];
    var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
    var identifier = value['identifier'];
    var category = value['category'];
    if (odd) {
        qz_array.push('B325,20,0,1A,2,2,70,B,"' + key + '"\n');
        qz_array.push('A325,125,0,3,1,1,N,"' + category + '"\n');
        qz_array.push('A325,150,0,4,1,1,N,"' + design + '"\n');
        qz_array.push('A325,182,0,3,1,1,N,"' + color + '"\n');
        qz_array.push('A545,182,0,3,1,1,N,"' + size + '"\n');
        qz_array.push('A325,205,0,3,1,1,N,"' + identifier + '"\n');
        qz_array.push('A325,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
        qz_array.push('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
        qz_array.push('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
        qz_array.push('\nP1,1\n');
        total_barcodes_printed++;
        total_print_documents++;
        odd = 0;
        quantity--;
    }
    if (quantity > 0) {
        var v = Math.floor(quantity / 2);
        if (quantity % 2 == 0 || Math.floor(quantity / 2) > 0) {
            var set = Math.floor(quantity / 2);
            var remaining = quantity % 2;
            qz_array.push('\nN\n');
            qz_array.push('B0,20,0,1A,2,2,70,B,"' + key + '"\n');
            qz_array.push('B325,20,0,1A,2,2,70,B,"' + key + '"\n');

            qz_array.push('A0,125,0,3,1,1,N,"' + category + '"\n');
            qz_array.push('A325,125,0,3,1,1,N,"' + category + '"\n');

            qz_array.push('A0,150,0,4,1,1,N,"' + design + '"\n');
            qz_array.push('A325,150,0,4,1,1,N,"' + design + '"\n');

            qz_array.push('A0,182,0,3,1,1,N,"' + color + '"\n');
            qz_array.push('A325,182,0,3,1,1,N,"' + color + '"\n');

            qz_array.push('A190,182,0,3,1,1,N,"' + size + '"\n');
            qz_array.push('A545,182,0,3,1,1,N,"' + size + '"\n');

            qz_array.push('A0,205,0,3,1,1,N,"' + identifier + '"\n');
            qz_array.push('A325,205,0,3,1,1,N,"' + identifier + '"\n');

            qz_array.push('A0,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            qz_array.push('A325,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');

            qz_array.push('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
            qz_array.push('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');

            qz_array.push('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            qz_array.push('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            qz_array.push('\nP' + set + ',1\n');
            total_barcodes_printed += set * 2;
            total_print_documents++;
        }


        if (remaining || Math.floor(quantity / 2) == 0) {
            qz_array.push('\nN\n');
            qz_array.push('B0,20,0,1A,2,2,70,B,"' + key + '"\n');
            qz_array.push('A0,125,0,3,1,1,N,"' + category + '"\n');
            qz_array.push('A0,150,0,4,1,1,N,"' + design + '"\n');
            qz_array.push('A0,182,0,3,1,1,N,"' + color + '"\n');
            qz_array.push('A190,182,0,3,1,1,N,"' + size + '"\n');
            qz_array.push('A0,205,0,3,1,1,N,"' + identifier + '"\n');

            qz_array.push('A0,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            qz_array.push('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
            qz_array.push('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');


            total_barcodes_printed++;
            odd = 1;
            remaining = 0;
        }
    }

}

function pBNoMRP(key, value, date_string) {
    var quantity = value['quantity'];
    var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
    var wsp = value['wsp'];
    var identifier = value['identifier'];
    var category = value['category'];
    if (odd) {
        qz_array.push('B325,20,0,1A,2,2,70,B,"' + key + '"\n');
        qz_array.push('A325,125,0,3,1,1,N,"' + category + '"\n');
        qz_array.push('A325,150,0,4,1,1,N,"' + design + '"\n');
        //qz_array.push('A325,150,0,3,1,1,N,"' + design + '_' + 'F00' + wsp + '00V' + '"\n');
        qz_array.push('A325,182,0,3,1,1,N,"' + color + '"\n');
        qz_array.push('A545,182,0,3,1,1,N,"' + size + '"\n');
        qz_array.push('A325,205,0,3,1,1,N,"' + identifier + '"\n');
        //qz_array.push('A325,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
        //qz_array.push('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
        qz_array.push('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
        qz_array.push('\nP1,1\n');
        total_barcodes_printed++;
        total_print_documents++;
        odd = 0;
        quantity--;
    }
    if (quantity > 0) {
        var v = Math.floor(quantity / 2);
        if (quantity % 2 == 0 || Math.floor(quantity / 2) > 0) {
            var set = Math.floor(quantity / 2);
            var remaining = quantity % 2;
            qz_array.push('\nN\n');
            qz_array.push('B0,20,0,1A,2,2,70,B,"' + key + '"\n');
            qz_array.push('B325,20,0,1A,2,2,70,B,"' + key + '"\n');

            qz_array.push('A0,125,0,3,1,1,N,"' + category + '"\n');
            qz_array.push('A325,125,0,3,1,1,N,"' + category + '"\n');

            qz_array.push('A0,150,0,4,1,1,N,"' + design + '"\n');
            qz_array.push('A325,150,0,4,1,1,N,"' + design + '"\n');
            
            //qz_array.push('A0,150,0,3,1,1,N,"' + design + '_' + 'F00' + wsp + '00V' + '"\n');
            //qz_array.push('A325,150,0,3,1,1,N,"' + design + '_' + 'F00' + wsp + '00V' + '"\n');

            qz_array.push('A0,182,0,3,1,1,N,"' + color + '"\n');
            qz_array.push('A325,182,0,3,1,1,N,"' + color + '"\n');

            qz_array.push('A190,182,0,3,1,1,N,"' + size + '"\n');
            qz_array.push('A545,182,0,3,1,1,N,"' + size + '"\n');

            qz_array.push('A0,205,0,3,1,1,N,"' + identifier + '"\n');
            qz_array.push('A325,205,0,3,1,1,N,"' + identifier + '"\n');

            //qz_array.push('A0,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            //qz_array.push('A325,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');

            //qz_array.push('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
            //qz_array.push('A325,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');

            qz_array.push('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            qz_array.push('A325,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');
            qz_array.push('\nP' + set + ',1\n');
            total_barcodes_printed += set * 2;
            total_print_documents++;
        }


        if (remaining || Math.floor(quantity / 2) == 0) {
            qz_array.push('\nN\n');
            qz_array.push('B0,20,0,1A,2,2,70,B,"' + key + '"\n');
            qz_array.push('A0,125,0,3,1,1,N,"' + category + '"\n');
            qz_array.push('A0,150,0,4,1,1,N,"' + design + '"\n');
            //qz_array.push('A0,150,0,3,1,1,N,"' + design + '_' + 'F00' + wsp + '00V' + '"\n');
            qz_array.push('A0,182,0,3,1,1,N,"' + color + '"\n');
            qz_array.push('A190,182,0,3,1,1,N,"' + size + '"\n');
            qz_array.push('A0,205,0,3,1,1,N,"' + identifier + '"\n');

            //qz_array.push('A0,230,0,3,1,1,N,"M.R.P. Rs. ' + mrp + '"\n');
            //qz_array.push('A0,252,0,2,1,1,N,"(Inclu. of all taxes)"\n');
            qz_array.push('A0,275,0,1,1,1,N,"Pcs 1 Pkd. Dt: ' + date_string + '"\n');


            total_barcodes_printed++;
            odd = 1;
            remaining = 0;
        }
    }

}


function printBarcodes_tags() {
    if (qz) {
        qz.findPrinter('Zebra');
    } else {
        qz = document.getElementById('qz');
        qz.findPrinter('Zebra');
    }
    var date = new Date();
    var date_string = date.getDate() + "." + parseInt(parseInt(date.getMonth()) + 1) + "." + date.getFullYear();
    var totalBarcodes = 0;
    var subTotal = 0;
    var print = print_array;
    var c = 0;
    $.each(print, function(key, value) {
        pB_tags(key, value, date_string);
        c++;
    });
    qz.setEndOfDocument("^XZ");
    qz.setDocumentsPerSpool("10");
    var r = confirm("Are you sure you want to print " + total_barcodes_printed + " barcodes");
    if (r == true) {
        qz.print();
    }
    total_print_documents = 0;
    total_barcodes_printed = 0;
}

function pB_tags(key, value, date_string) {
    var quantity = value['quantity'];
    var design = value['design'];
    var color = value['color'];
    var size = value['size'];
    var mrp = value['mrp'];
    var identifier = value['identifier'];
    var category = value['category'];
    var worker_id = value['worker_id'];
    //var unique_code = "Vamas "+ category + "-" + design + "-" + color + "-" + size + "-" +worker_id;
    for (i = 0; i < quantity; i++) {
        qz_array.push('^XA^MCY^XZ');
        qz_array.push('^XA');
        qz_array.push('^FX Top section with company logo, name and address.');
        qz_array.push('^CF0,60');
        qz_array.push('^BY2,2,80');
        qz_array.push('^FO45,60^BC^FD' + key + '^FS');
        qz_array.push('^FO10,165^GB300,3,3^FS');
        qz_array.push('^FX Second section with recipient address and permit information.');
        qz_array.push('^CFA,20');
        qz_array.push('^FO20,190^FDStyle - ' + design + '^FS');
        qz_array.push('^FO20,220^FDColor - ' + color + '^FS');
        qz_array.push('^FO20,250^FDSize -  ' + size + '^FS');
        qz_array.push('^FO20,280^FDType - ' + identifier + '^FS');
        qz_array.push('^FO20,310^FDQuantity - 1 PC^FS');
        qz_array.push('^FO20,340^FDMFD - ' + date_string + '^FS');
        qz_array.push('^FO10,370^GB300,3,3^FS');
        qz_array.push('^FX Second section with recipient address and permit information.');
        qz_array.push('^CFA,40');
        qz_array.push('^FO20,390^FDMRP Rs.' + mrp + '/-^FS');
        qz_array.push('^CFA,13');
        qz_array.push('^FO80,430^FD(Inclusive of all taxes)^FS');
        qz_array.push('^FO10,440^GB300,3,3^FS');
        qz_array.push('^FX Fourth section (the two boxes on the bottom).');
        qz_array.push('^FO20,460^GB280,180,3^FS');
        qz_array.push('^CFA,15');
        qz_array.push('^FO30,470^FDVamas^FS');
        qz_array.push('^FO30,495^FD3,Jamuna Bhaiya Chawl,^FS');
        qz_array.push('^FO30,520^FDPestom Sagar Road No.3^FS');
        qz_array.push('^FO30,545^FDMumbai - 400089^FS');
        qz_array.push('^FO30,570^FDContact No:25253808^FS');
        qz_array.push('^FO30,595^FDEmail:support@vamas.in^FS');
        qz_array.push('^FO80,620^FDwww.vamas.in^FS');
        qz_array.push('^XZ');
        total_barcodes_printed++;
    }
}

function monitorPrinting(qz) {
    if (qz != null) {
        if (!qz.isDonePrinting()) {
            window.setTimeout('monitorPrinting()', 100);
        } else {
            var e = qz.getException();
            alert(e == null ? "Printed Successfully" : "Exception occured: " + e.getLocalizedMessage());
        }
    } else {
        //  alert("Applet not loaded!");
    }
}

function changeLocation(path) {
    document.location.href = '../../' + path;
}

/*
 * Used to manage the loaders 
 */
function changeLoaderText(text) {
    //alert($("#loader_text").hmtl());
    $("#loader_text").html(text);
}

function ajaxindicatorstart(text) {
    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="/images/ajax-loader.gif"><div id="loader_text">' + text + '</div></div><div class="bg"></div></div>');
    } else {
        changeLoaderText(text);
    }
    jQuery('#resultLoading').css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': '10000000',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto'
    });

    jQuery('#resultLoading .bg').css({
        'background': '#000000',
        'opacity': '0.7',
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'top': '0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '250px',
        'height': '75px',
        'text-align': 'center',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto',
        'font-size': '16px',
        'z-index': '10',
        'color': '#ffffff'

    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}

function ajaxindicatorstop() {
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}

function reload_page() {
    document.location.href = document.location.href;
}

function organizePagination(pages, page) {
    var count = $('#count option:selected').text();
    if (pages > 0) {
        var paginationRows = "";
        var current_page = page;
        var total_pages = pages;

        var current_first = page - (page % 5);
        var current_last = page + (5 - (page % 5));
        if (current_first < 1)
            current_first = 1;
        if (current_last > total_pages)
            current_last = total_pages;
        if (current_page > 1)
            paginationRows += '<li><a href="#" data-page="previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';
        else
            paginationRows += '<li class="disabled"><a href="javascript:void(0)" data-page="disabled"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>';

        for (i = current_first; i < current_last + 1; i++) {
            if (i == page)
                paginationRows += '<li class="active"><a href="#" data-page="' + i + '">' + i + '</a></li>';
            else
                paginationRows += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>';
        }
        if (current_page < total_pages)
            paginationRows += '<li><a href="javascript:void(0)" data-page="next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';
        else
            paginationRows += '<li class="disabled"><a href="javascript:void(0)" data-page="disabled"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>';

        //$('.pagination-message').html((current_first)+" to "+ (parseInt(current_first) + +count) + " of "+ (pages*count)  )
        $('.pagination:last').empty();
        $('.pagination:last').append(paginationRows);
    } else {
        $('.pagination:last').empty();
    }
}

// Gets the current url's path, such as http://site.com/example/dist/
function getPath() {
    var path = window.location.href;
    return path.substring(0, path.lastIndexOf("/")) + "/";
}

function intToFormat(nStr)
    {
     nStr += '';
     x = nStr.split('.');
     x1 = x[0];
     x2 = x.length > 1 ? '.' + x[1] : '';
     var rgx = /(\d+)(\d{3})/;
     var z = 0;
     var len = String(x1).length;
     var num = parseInt((len/2)-1);
 
      while (rgx.test(x1))
      {
        if(z > 0)
        {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        else
        {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
          rgx = /(\d+)(\d{2})/;
        }
        z++;
        num--;
        if(num == 0)
        {
          break;
        }
      }
     return x1 + x2;
    }



function tableNavigate(e) {
    var curr_tr_2 = $("#tblDataBodyN").find("tr.warning").first();
    if (e.keyCode == 40) { //down
        if (curr_tr_2.length == 0) {
            curr_tr_2 = $("#tblDataBodyN").find("tr").first();
        } else {
            curr_tr_2.removeClass("warning");
            curr_tr_2 = curr_tr_2.next("tr");
        }
        curr_tr_2.addClass("warning");
    } else if (e.keyCode == 38) { //up
        if (curr_tr_2.length == 0) {
            curr_tr_2 = $("#tblDataBodyN").find("tr").last();
        } else {
            curr_tr_2.removeClass("warning");
            curr_tr_2 = curr_tr_2.prev("tr");
        }
        curr_tr_2.addClass("warning");
    } else if (e.keyCode == 13) { //enter
        $(curr_tr_2).click();
        return false;
    }
}