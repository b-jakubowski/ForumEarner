import re

import unidecode


def valid_age(content):
    age = re.search(r'(\n|>).iek.*?(\d{2})', content)
    if age:
        age = age.group(2).replace('/strong>', '')

    return age


def valid_stack(content):
    stack = re.search(r'(\n|>)(.tanowisko|.echnologia|.echnologie|..zyk).(.*)<', content)
    if stack:
        stack = stack.group(3).replace('/strong>', '').replace('&gt;', '') \
            .replace('&lt', '').replace(':', '').strip()

    if 'javascript' in stack:
        stack = 'Javascript'
    elif 'java' in stack:
        stack = 'Java'
    elif 'c#' in stack:
        stack = '.NET'
    elif 'c++' in stack:
        stack = 'C++'
    elif 'php' in stack or 'magent' in stack or 'laravel' in stack or 'symfony' in stack:
        stack = 'PHP'
    elif 'python' in stack:
        stack = 'Python'
    elif 'ruby' in stack:
        stack = 'Ruby'
    elif 'kotlin' in stack:
        stack = 'Kotlin'
    elif 'swift' in stack:
        stack = 'iOS'
    elif 'golang' in stack:
        stack = 'Golang'
    elif 'rust' in stack:
        stack = 'Rust'
    elif 'vba' in stack:
        stack = 'Visual Basic'
    elif '.net' in stack:
        stack = '.NET'
    elif 'android' in stack:
        stack = 'Android'
    elif 'ios' in stack:
        stack = 'iOS'
    elif 'ror' in stack:
        stack = 'Ruby'
    elif 'embedded' in stack:
        stack = 'Embedded'
    elif 'cobol' in stack:
        stack = 'Cobol'
    elif 'scala' in stack:
        stack = 'Scala'
    elif 'angular' in stack:
        stack = 'Javascript'
    elif 'react' in stack:
        stack = 'Javascript'
    elif 'web' in stack:
        stack = 'Javascript'
    elif 'front' in stack:
        stack = 'Javascript'
    elif 'back' in stack:
        stack = 'Backend'
    elif 'full' in stack:
        stack = 'Fullstack'
    elif 'anal' in stack:
        stack = 'Analityk'
    elif 'manual' in stack:
        stack = 'Tester manualny'
    elif 'automat' in stack:
        stack = 'Tester automatyczny'
    elif 'tester' in stack:
        stack = 'Tester'
    elif 'qa' in stack:
        stack = 'Tester'
    elif 'devops' in stack:
        stack = 'DevOps'
    elif 'sql' in stack:
        stack = 'SQL'
    elif 'admin' in stack:
        stack = 'Admin'
    elif 'sharepoint' in stack:
        stack = 'SharePoint'
    elif 'archite' in stack:
        stack = 'Architekt'
    elif 'js' in stack:
        stack = 'Javascript'
    elif '. net' in stack:
        stack = '.NET'
    elif 'test' in stack:
        stack = 'Tester automatyczny'
    elif 'nodejs' in stack or 'node.js' in stack or 'node' in stack:
        stack = 'Javascript'
    elif 'django' in stack:
        stack = 'Django'
    elif 'typescript' in stack:
        stack = 'Javascript'
    elif 'spring' in stack:
        stack = 'Java'
    elif 'bi' in stack or 'intelligence' in stack:
        stack = 'Analityk'
    elif 'data' in stack or 'etl' in stack or 'dwh' in stack:
        stack = 'Big Data'
    elif 'system' in stack:
        stack = 'Embedded'
    elif 'machine' in stack:
        stack = 'Machine Learning'
    elif 'wordpress' in stack:
        stack = 'Wordpress'
    elif 'support' in stack or 'help' in stack:
        stack = 'Helpdesk'
    elif 'programista c' in stack:
        stack = 'Embedded'

    if stack is not None:
        if stack is not 'iOS' and stack is not '.NET' and stack is not 'PHP' and stack is not 'SQL':
            stack = stack.title()

        stack = re.sub(r'\(.*?\)', '', stack)
        stack = stack[:40]

    return stack


def valid_experience(content):
    exp = re.search(r'(\n|>)(.o.wiadczenie|.o.w).(.*)<', content)
    if exp:

        exp = exp.group(3).replace('/strong>', '').replace('&gt;', '') \
            .replace('&lt', '').replace(',', '.').replace(':', '').strip()

        if re.search(r'(\d|rok|lat.*|mies.*)',
                     exp) is None and 'brak' not in exp and 'staż' not in exp and 'praktyk' not in exp and 'pierwsza praca' not in exp:
            exp = None
        elif 'brak' in exp or 'staż' in exp or 'praktyk' in exp or 'pierwsza praca' in exp and re.search(r'\d',
                                                                                                         exp) is None:
            exp = 0
        elif re.search(r'(msc|mies|mc|m-c|m-cy|miechy|\dm|ms)', exp) is None:
            if re.search(r'(\d+)(-|/)(\d+)', exp) and len(re.findall(r'[0-9]+', exp)) <= 2:
                exp = re.search(r'(\d+)(-|/)(\d+)', exp).group(1)
            elif re.search(r'\d+.\d+', exp) and len(re.findall(r'[0-9]+', exp)) <= 2:
                exp = re.search(r'\d+.\d+', exp).group(0)
            elif re.search(r'\d+', exp):
                exp = re.search(r'\d+', exp).group(0)
            elif re.search(r"rok\s", exp) or re.search(r'rok$', exp):
                exp = 1
            elif re.search(r'p...roku', exp):
                exp = 0.5
            elif re.search(r'p..tora roku', exp):
                exp = 1.5
            else:
                exp = None
        elif re.search(r'(msc|mies|mc|m-c|m-cy|miechy|\dm|ms)', exp) is not None:
            if len(re.findall(r'[0-9]+', exp)) > 1:
                if re.search(r'(\d+).*?(lat|lat.|rok|rok.).*?(\d+)', exp) is not None:
                    regex = re.search(r'(\d+).*?(lat|lat.|rok|rok.).*?(\d+)', exp)
                    exp = round(float(regex.group(1)) + float(regex.group(3)) / 12, 2)
                elif re.search(r'(msc|mies|mc|m-c|m-cy|miechy|\dm|ms)', exp) is None:
                    exp = re.search(r'(\d+)', exp).group(1)
                else:
                    exp = round(float(re.search(r'(\d+)', exp).group(1)) / 12, 2)
            elif re.search(r'rok.*?(\d+)', exp):
                exp = round(float(1.0 + float(int(re.search(r'rok.*?(\d+)', exp).group(1))) / 12), 2)
            elif re.search(r'rok.*', exp):
                exp = 1
            elif re.search(r'(msc|mies|mc|m-c|m-cy|miechy|\dm|ms)', exp) is not None:
                exp = int(re.search(r'(\d+)', exp).group(1))
                exp = round(float(exp / 12), 2)
            else:
                exp = None
        else:
            exp = None

    if exp is not None:
        exp = float(exp)
        exp = '{0:g}'.format(exp)

    return exp


def valid_salary(content):
    salary = re.search(r'(\n|>)(.ynagrodzenie|.arobki|.tawka|.asa).(.*)<', content)
    if salary:
        salary = salary.group(3).replace('/strong>', '').replace('&gt;', '') \
            .replace('&lt', '').replace(':', '').replace(',', '.').strip()

        if re.search(r'.*?\Wuop\W.*?', content) or re.search(r'.*?\Wumowa o prac.\W.*?', content) \
                or re.search(r'.*?\Wetat\W.*?', content) and 'zlecenie' not in content:
            salary = get_salary(salary, 'uop')
        elif re.search(r'.*?b2b.*?', content) or re.search(r'.*?vat.*?', content) or re.search(r'.*?\Wfv.*?', content) \
                or re.search(r'.*?kontrakt.*?', content) or re.search(r'.*?działalno.*?',
                                                                      content) and 'umowa o dzie' not in content:
            salary = get_salary(salary, 'b2b')
        elif re.search(r'.*?\Wuz\W.*?', content) or re.search(r'.*?zlecenie.*?', content):
            salary = get_salary(salary, 'uz')
        elif re.search(r'.*?\Wud\W.*?', content) or re.search(r'.*?umowa o dzie.*?', content) or re.search(
                r'.*?\Wuod\W.*?', content):
            salary = get_salary(salary, 'uod')
        elif 'freelancer' in content:
            salary = None
        elif re.search(r'\d', salary) is not None:
            salary = get_salary(salary, '?')
        else:
            salary = None

    return salary


def get_salary(salary, contract_type):
    if re.search(r'.*?(\d+)(\.|,|\s|\')(\d+).*?', salary):
        if re.search(r'.*?(\d+)(\.|,)(\d+)(|\s)k.*?', salary):
            first_part = re.search(r'.*?(\d+)(\.|,)(\d+)(|\s)k.*?', salary).group(1)
            second_part = re.search(r'.*?(\d+)(\.|,)(\d+)(|\s)k.*?', salary).group(3)
            contract_salary = int(first_part) * 1000 + int(second_part) * 100
        elif re.search(r'.*?(\d+)(\.|,)(\d+).*?(tyś|tys).*?', salary):
            first_part = re.search(r'.*?(\d+)(\.|,)(\d+).*?(tyś|tys).*?', salary).group(1)
            second_part = re.search(r'.*?(\d+)(\.|,)(\d+).*?(tyś|tys).*?', salary).group(3)
            contract_salary = int(first_part) * 1000 + int(second_part) * 100
        elif re.search(r'.*?(\d+)(\.|,)(\d+).*?(/h|/ h|/g|/ g|godz.*|rbh).*?', salary):
            first_part = re.search(r'.*?(\d+)(\.|,)(\d+).*?(/h|/ h|/g|/ g|godz.*|rbh).*?', salary).group(1)
            second_part = re.search(r'.*?(\d+)(\.|,)(\d+).*?(/h|/ h|/g|/ g|godz.*|rbh).*?', salary).group(3)
            contract_salary = int(first_part) * 160 + int(second_part) / 10 * 100
        elif re.search(r'.*?(\d+)(\.|,)(\d+).*?(dzien.*|dzień|per day|md|/d|/ d).*?', salary):
            first_part = re.search(r'.*?(\d+)(\.|,)(\d+).*?(dzien.*|dzień|per day|md|/d|/ d).*?', salary).group(1)
            second_part = re.search(r'.*?(\d+)(\.|,)(\d+).*?(dzien.*|dzień|per day|md|/d|/ d).*?', salary).group(3)
            contract_salary = int(first_part) * 20 + int(second_part) * 10
        else:
            first_part = str(re.search(r'.*?(\d+)(\.|,|\s|\')(\d+).*?', salary).group(1))
            second_part = str(re.search(r'.*?(\d+)(\.|,|\s|\')(\d+).*?', salary).group(3))
            contract_salary = int(first_part + second_part)

            if contract_salary < 100:
                contract_salary *= 100
    else:
        if re.search(r'.*?(\d+)(|\s)k.*?', salary):
            if 'rok' in salary or 'rocznie' in salary:
                contract_salary = int(re.search(r'.*?(\d+)(|\s)k.*?', salary).group(1)) * 1000
                contract_salary /= 12
            else:
                contract_salary = int(re.search(r'.*?(\d+)(|\s)k.*?', salary).group(1)) * 1000
        elif re.search(r'.*?(\d+).*?(tyś|tys.*).*?', salary):
            contract_salary = int(re.search(r'.*?(\d+).*?(tyś|tys.*).*?', salary).group(1)) * 1000
        elif re.search(r'.*?(\d+).*?(/h|/ h|/g|/ g|godz.*|rbh).*?', salary):
            contract_salary = int(re.search(r'.*?(\d+).*?(/h|/ h|/g|/ g|godz.*|rbh).*?', salary).group(1)) * 160
        elif re.search(r'.*?(\d+).*?(dzien.*|dzień|per day|md|/d|/ d).*?', salary):
            contract_salary = int(re.search(r'.*?(\d+).*?(dzien.*|dzień|per day|md|/d|/ d).*?', salary).group(1)) * 20
        else:
            contract_salary = int(re.search(r'.*?(\d+).*', salary).group(1))

    if contract_salary > 50000 or contract_salary < 800:
        contract_salary = None

    if contract_salary is not None:

        if contract_salary < 15 and len(re.findall(r'[0-9]', salary)) < 3:
            contract_salary *= 1000

        contract_salary = int(contract_salary)
        contract_salary = format(contract_salary, ',').replace(',', ' ').replace('.0', '')

        if '€' in salary or 'eur' in salary:
            contract_salary = str(contract_salary) + ' eur'
        elif '$' in salary or 'usd' in salary:
            contract_salary = str(contract_salary) + ' usd'
        elif '£' in salary or 'gbp' in salary:
            contract_salary = str(contract_salary) + ' gbp'
        else:
            contract_salary = str(contract_salary) + ' pln'

        if 'brutto' in salary:
            contract_salary += ' brutto ' + contract_type
        elif 'netto' in salary or 'na rek' in salary:
            contract_salary += ' netto ' + contract_type
        else:
            if 'b2b' in contract_type:
                contract_salary += ' netto ' + contract_type
            else:
                contract_salary += ' ! ' + contract_type

    return contract_salary


def valid_location(content):
    location = re.search(r'(\n|>)(.iasto|.iejsce|.okalizacja).(.*)<', content)
    if location:

        location = unidecode.unidecode(location.group(3).replace('/strong>', '').replace('&gt;', '').replace('&lt', '')
                                       .replace(':', '').strip())

        if 'zdaln' in location or 'on-line' in location or 'google play' in location or 'remote' in location:
            location = 'zdalnie'
        elif 'warszawa' in location or 'wwa' in location or 'wawa' in location or 'stolica' in location \
                or 'stolyca' in location or 'warszafka' in location or 'w-wa' in location or 'waw' in location:
            location = 'Warszawa'
        elif 'krakow' in location or 'krk' in location:
            location = 'Kraków'
        elif 'trojmiasto' in location or 'gdansk' in location or '3city' in location or '3miasto' in location:
            location = 'Gdańsk'
        elif 'wroclaw' in location or 'wrocek' in location or 'woclaw' in location:
            location = 'Wrocław'
        elif 'poznan' in location:
            location = 'Poznań'
        elif 'lodz' in location:
            location = 'Łódź'
        elif 'rzeszow' in location:
            location = 'Rzeszów'
        elif 'slask' in location:
            location = 'Śląsk'
        elif 'katowice' in location:
            location = 'Katowice'
        elif 'torun' in location:
            location = 'Toruń'
        elif 'b-b' in location or 'bielsko' in location:
            location = 'Bielsko-Biała'
        elif 'bialystok' in location:
            location = 'Białystok'
        elif 'pn' in location:
            location = 'Poznań'
        elif 'zielona gora' in location:
            location = 'Zielona Góra'
        elif 'czestochowa' in location:
            location = 'Częstochowa'
        elif 'lomza' in location:
            location = "Łomża"
        elif 'chelm' in location:
            location = 'Chełm'

        if len(location) > 80:
            location = None
        else:
            location = location.title()
            location = re.sub(r'\(.*?\)', '', location)

    return location
