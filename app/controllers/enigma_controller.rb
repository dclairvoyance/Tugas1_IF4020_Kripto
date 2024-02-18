class EnigmaController < ApplicationController
    # skip_before_action :verify_authenticity_token
    
    def encrypt
        user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
        user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')
        
        settings = set_settings(user_key)
        rotors = settings[:rotors]
        reflector = settings[:reflector]

        message = ""
        user_input.each_char do |char|
            message += encrypt_letter(char, rotors, reflector)
        end
    
        render json: { message: message }
    end
    
    def decrypt
        user_input = params[:userInput].to_s.upcase.gsub(/[^A-Z]/, '')
        user_key = params[:userKey].to_s.upcase.gsub(/[^A-Z]/, '')
        
        rotors = set_settings[:rotors]
        reflector = set_settings[:reflector]

        message = ""
        user_input.each_char do |char|
            message += decrypt_letter(char, rotors, reflector)
        end
    
        render json: { message: message }
    end
  
    private

    # set wirings of rotors
    ROTOR1 = "WICJQXYLVEAHFPSDNBGKZMTRUO"
    ROTOR2 = "YUTADWKEVZMFOXLJCQHINSGBRP"
    ROTOR3 = "EGCJRMHOYLZQUFPATIBVNKWDSX"
    ROTOR4 = "CGMERKHFZTLOSQJPWAUVNBXDIY"

    def set_settings(keys)
        rotor1 = set_rotor_wiring(ROTOR1.chars.rotate(keys[0].ord - 'A'.ord + 1).join)
        rotor2 = set_rotor_wiring(ROTOR2.chars.rotate(keys[1].ord - 'A'.ord + 1).join)
        rotor3 = set_rotor_wiring(ROTOR3.chars.rotate(keys[2].ord - 'A'.ord + 1).join)
        rotor4 = set_rotor_wiring(ROTOR4.chars.rotate(keys[3].ord - 'A'.ord + 1).join)
        rotors = [rotor1, rotor2, rotor3, rotor4]
        reflector = set_reflector_wiring
        {rotors: rotors, reflector: reflector}
    end

    def encrypt_letter(letter, rotors, reflector)
        rotors.each {|rotor| letter = rotor[letter]}
        letter = reflector[letter]
        rotors.reverse_each do |rotor|
            rotor.each do |k, v|
                if v == letter 
                    letter = k
                    break
                end
            end
        end
        letter
    end

    def decrypt_letter(letter, rotors, reflector)
        rotors.reverse_each do |rotor|
            rotor.each do |k, v|
                if v == letter 
                    letter = k
                    break
                end
            end
        end
        letter = reflector[letter]
        rotors.each {|rotor| letter = rotor[letter]}
        letter
    end

    def set_rotor_wiring(wiring)
        alphabets = "A".."Z"
        # wiring1 = "WICJQXYLVEAHFPSDNBGKZMTRUO"
        # wiring2 = "YUTADWKEVZMFOXLJCQHINSGBRP"
        # wiring3 = "EGCJRMHOYLZQUFPATIBVNKWDSX"
        # wiring4 = "CGMERKHFZTLOSQJPWAUVNBXDIY"
        rotor = {}
        alphabets.each_with_index {|letter, index| rotor[letter] = wiring[index]}
        rotor
    end

    def set_reflector_wiring
        alphabets = ("A".."Z").to_a
        wiring = "DPVSWNHEZIOXYMQRCJGAKFTBUL"
        reflector = {}
        for i in 0..12
            reflector[wiring[i]] = wiring[25-i]
            reflector[wiring[25-i]] = wiring[i]
        end
        reflector
    end 
end
    