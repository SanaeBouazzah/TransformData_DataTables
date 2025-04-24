<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('nom', TextType::class, [
            'attr' => ['id' => 'nom']
        ])
        ->add('prenom', TextType::class, [
            'attr' => ['id' => 'prenom']
        ])
        ->add('username', TextType::class, [
            'attr' => ['id' => 'username']
        ])
        ->add('password', PasswordType::class, [
            'attr' => ['id' => 'password']
        ])
        ->add('position', TextType::class, [
            'attr' => ['id' => 'position']
        ])
        ->add('adresse', TextType::class, [
            'attr' => ['id' => 'adresse']
        ])
        ->add('Tel1', TextType::class, [
            'attr' => ['id' => 'Tel1']
        ])
        ->add('Tel2', TextType::class, [
            'attr' => ['id' => 'Tel2']
        ])
        ->add('roles', ChoiceType::class, [
            'label' => 'Rôles',
            'choices'  => [
                'Utilisateur' => 'ROLE_USER',
                'Administrateur' => 'ROLE_ADMIN',
                'Super Administrateur' => 'ROLE_SUPER_ADMIN',
            ],
            'expanded' => false,
            'required' => true,
        ]);
     }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
