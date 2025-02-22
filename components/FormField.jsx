import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import React from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`} style={{ marginBottom: 8 }}>
      <Text style={{
        fontSize: 16, // text-base (Tailwind's base size is 16px)
        color: '#F3F4F6', // text-gray-100 (Hex equivalent from Tailwind)
        fontFamily: 'Poppins-Medium', // font-pmedium (Assuming you're using Poppins font)
      }}>{title}</Text>
      <View style={{
        borderWidth: 2,
        borderColor: '#262626',
        width: '100%',
        height: 64, // h-16 (16 * 4 = 64px)
        paddingHorizontal: 16, // px-4 (4 * 4 = 16px)
        backgroundColor: '#111', // Adjust based on `bg-black-100`
        borderRadius: 16, // rounded-2xl (2xl = 16px)
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
    }}>
        <TextInput
            style={{
              flex: 1,
              color: 'white',
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
            }}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            secureTextEntry={title==='Password' && !showPassword}
        />
        {title==='Password' && (
            <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField